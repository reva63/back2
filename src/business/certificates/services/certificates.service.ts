import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { CertificateEntity } from '../entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';
import { S3Service } from 'src/core/S3/s3.service';
import { PdfService } from './pdf-generator.service';

@Injectable()
export class CertificatesService implements IService<CertificateEntity> {
    constructor(
        @InjectRepository(CertificateEntity)
        private certificatesRepository: Repository<CertificateEntity>,
        private readonly pdfService: PdfService,
        private readonly s3Service: S3Service,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<CertificateEntity[]> {
        return await this.certificatesRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<CertificateEntity> {
        const certificate = await this.certificatesRepository.findOne({
            relations: {
                user: { profile: true },
                contest: true,
                direction: true,
                stage: true,
            },
            where: { id: options.params.certificate },
        });
        if (!certificate) {
            throw new NotFoundException();
        }
        return certificate;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<CertificateEntity> {
        const creatable = {
            key: options.body.key,
            name: options.body.name,
            user: options.body.user,
            contest: options.body.contest,
            direction: options.body.direction,
            category: options.body.category,
            stage: options.body.stage,
        } as DeepPartial<CertificateEntity>;
        return await this.certificatesRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<CertificateEntity> {
        const creatable = {
            key: options.body.key,
            name: options.body.name,
            user: options.body.user,
            contest: options.body.contest,
            direction: options.body.direction,
            category: options.body.category,
            stage: options.body.stage,
        } as DeepPartial<CertificateEntity>;

        await this.certificatesRepository.update(
            { id: options.params.certificate },
            creatable,
        );

        // Fields changed - probably need to recreate PDF too
        await this.deletePdf({ params: options.params });

        return await this.certificatesRepository.findOneBy({
            id: options.params.certificate,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const certificate = await this.certificatesRepository.findOneBy({
            id: options.params.certificate,
        });
        if (!certificate) {
            throw new NotFoundException();
        }
        await this.certificatesRepository.remove(certificate);
        await this.deletePdf({ params: options.params });
    }

    async getPdfUrl(options: { params?: IParamsDto; body?: IBodyDto }) {
        const certificate = await this.show({ params: options.params });
        const pdfFile = await this.pdfService.generatePdf(certificate);
        const key = this.generateS3Key(certificate.id);

        const isFileExists = await this.s3Service.checkObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });

        if (!isFileExists) {
            await this.s3Service.uploadObject({
                Bucket: process.env.S3CLIENT_BUCKET,
                Key: key,
                Body: pdfFile,
            });
        }
        return await this.s3Service.getSignedUrl({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });
    }

    async deletePdf(options: { params?: IParamsDto; body?: IBodyDto }) {
        const key = this.generateS3Key(options.params.certificate);
        await this.s3Service.deleteObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });
    }

    generateS3Key(certificate: number): string {
        return `certificates/certificate-${certificate}.pdf`;
    }

}
