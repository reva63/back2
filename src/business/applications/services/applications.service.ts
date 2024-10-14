import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { DeepPartial, Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ApplicationAttributesService } from './applicationAttributes.service';
import { ApplicationNotFoundException } from 'src/exceptions/applications/applicationNotFound.exception';

@Injectable()
export class ApplicationsService implements IService<ApplicationEntity> {
    constructor(
        @InjectRepository(ApplicationEntity)
        private readonly applicationsRepository: Repository<ApplicationEntity>,
        private readonly applicationAttributesService: ApplicationAttributesService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ApplicationEntity[]> {
        return await this.applicationsRepository.find({
            relations: { attributes: true, attachments: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        return await this.applicationsRepository.findOne({
            where: { id: options.params.application },
            relations: { attributes: true, attachments: true },
        });
    }

    async create(
        options: { params?: IParamsDto; body?: IBodyDto },
        isUpdate?: boolean,
    ): Promise<DeepPartial<ApplicationEntity>> {
        const directions = options.body.directions
            ? options.body.directions.map((id) => ({
                  id,
              }))
            : undefined;
        const categories = options.body.categories
            ? options.body.categories.map((id) => ({
                  id,
              }))
            : undefined;

        return {
            id: isUpdate ? options.params.application : undefined,
            contest: { id: options.body.contest },
            applicant: { id: options.params.user },
            directions,
            categories,
        } as DeepPartial<ApplicationEntity>;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const attributes =
            await this.applicationAttributesService.create(options);
        const creatable = await this.create(options);

        return await this.applicationsRepository.save({
            ...creatable,
            attributes,
        });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const application = { id: options.params.application };
        const isExists =
            await this.applicationsRepository.existsBy(application);
        if (!isExists) {
            throw new ApplicationNotFoundException();
        }

        const creatable = await this.create(options);
        await this.applicationsRepository.update(application, creatable);

        if (options.body.profileData || options.body.socialData?.length) {
            await this.applicationAttributesService.update(options);
        }

        return await this.applicationsRepository.findOne({
            where: application,
            relations: { attributes: true, attachments: true },
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const applicaion = await this.applicationsRepository.findOne({
            where: {
                id: options.params.application,
            },
            loadRelationIds: { relations: ['directions', 'categories'] },
        });
        if (!applicaion) {
            throw new ApplicationNotFoundException();
        }

        await this.applicationsRepository.remove(applicaion);
    }
}
