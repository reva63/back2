import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { StageEntity } from '../entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { S3Service } from 'src/core/S3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { StageNotFoundException } from 'src/exceptions/stages/stageNotFound.exception';

@Injectable()
export class StagesService implements IService<StageEntity> {
    constructor(
        @InjectRepository(StageEntity)
        private stagesRepository: Repository<StageEntity>,
        private s3Service: S3Service,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<StageEntity[]> {
        return await this.stagesRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<StageEntity> {
        const stage = await this.stagesRepository.findOneBy({
            id: options.params.stage,
        });

        if (!stage) {
            throw new StageNotFoundException();
        }

        return stage;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<StageEntity> {
        const creatable = {
            title: options.body.title,
            startDate: options.body.startDate,
            endDate: options.body.endDate,
            contest: options.body.contest,
            certificates: options.body.certificates,
        } as DeepPartial<StageEntity>;

        if (options.body.certificateTemplate) {
            creatable.templateKey = await this.uploadTemplate(
                options.body.certificateTemplate,
            );
        }

        return await this.stagesRepository.save(creatable);
    }

    async uploadTemplate(template: Buffer): Promise<string> {
        const key = this.generateS3Key();
        await this.s3Service.uploadObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
            Body: template,
        });
        return key;
    }

    async getTemplate(stage: StageEntity) {
        const key = stage.templateKey;
        const result = await this.s3Service.getObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });
        return result.Body;
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<StageEntity> {
        const stage = await this.show(options);
        if (!stage) {
            throw new StageNotFoundException();
        }

        const creatable = {
            title: options.body.title,
            startDate: options.body.startDate,
            endDate: options.body.endDate,
            contest: options.body.contest,
            certificates: options.body.certificates,
        } as DeepPartial<StageEntity>;

        if (options.body.certificateTemplate) {
            creatable.templateKey = await this.uploadTemplate(
                options.body.certificateTemplate,
            );
            await this.deleteTemplate(stage.templateKey);
        }

        await this.stagesRepository.update(
            { id: options.params.stage },
            creatable,
        );

        return await this.stagesRepository.findOneBy({
            id: options.params.stage,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const stage = await this.stagesRepository.findOneBy({
            id: options.params.stage,
        });
        if (!stage) {
            throw new StageNotFoundException();
        }
        await this.stagesRepository.remove(stage);
        await this.deleteTemplate(stage.templateKey);
    }

    generateS3Key(): string {
        return `certificates/templates/${uuidv4()}`;
    }

    async deleteTemplate(key: string) {
        await this.s3Service.deleteObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });
    }
}
