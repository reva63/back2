import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { CertificateEntity } from '../entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class CertificatesService implements IService<CertificateEntity> {
    constructor(
        @InjectRepository(CertificateEntity)
        private certificatesRepository: Repository<CertificateEntity>,
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
        const certificate = await this.certificatesRepository.findOneBy({
            id: options.params.certificate,
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
        } as DeepPartial<CertificateEntity>;

        await this.certificatesRepository.update(
            { id: options.params.certificate },
            creatable,
        );

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
    }
}
