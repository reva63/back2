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
            relations: { attributes: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        return await this.applicationsRepository.findOneBy({
            id: options.params.application,
        });
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const attributes =
            await this.applicationAttributesService.create(options);
        const creatable = {
            applicant: { id: options.params.user },
            contest: { id: options.params.contest },
            attributes,
        } as DeepPartial<ApplicationEntity>;

        return await this.applicationsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const creatable = {} as DeepPartial<ApplicationEntity>;
        const applicaion = await this.applicationsRepository.findOneBy({
            id: options.params.application,
        });
        if (!applicaion) {
            throw new ApplicationNotFoundException();
        }

        await this.applicationsRepository.update(
            {
                id: options.params.application,
            },
            creatable,
        );

        if (options.body.applicantData || options.body.applicantSocials) {
            await this.applicationAttributesService.update(options);
        }

        return await this.applicationsRepository.findOneBy({
            id: options.params.application,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const applicaion = await this.applicationsRepository.findOneBy({
            id: options.params.application,
        });
        if (!applicaion) {
            throw new ApplicationNotFoundException();
        }

        await this.applicationsRepository.remove(applicaion);
    }

    async removeAttributes(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const applicaion = await this.applicationsRepository.findOneBy({
            id: options.params.application,
        });
        if (!applicaion) {
            throw new ApplicationNotFoundException();
        }
        await this.applicationAttributesService.remove(options);
    }
}
