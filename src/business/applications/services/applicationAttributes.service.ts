import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { ApplicationAttributeEntity } from '../entities/applicationAttribute.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { ApplicationNotFoundException } from 'src/exceptions/applications/applicationNotFound.exception';

@Injectable()
export class ApplicationAttributesService
    implements IService<ApplicationAttributeEntity>
{
    constructor(
        @InjectRepository(ApplicationAttributeEntity)
        private readonly applicationAttributesRepository: Repository<ApplicationAttributeEntity>,
    ) {}

    async create(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<DeepPartial<ApplicationAttributeEntity>[]> {
        const attributes = {
            ...options.body.applicantData,
            ...options.body.applicantSocials,
        };
        const creatables = [] as DeepPartial<ApplicationAttributeEntity>[];
        const applicaion = { id: options.params.application };

        for (const [key, value] of Object.entries(attributes)) {
            const creatable = {
                key,
                value,
                applicaion,
            } as DeepPartial<ApplicationAttributeEntity>;
            creatables.push(creatable);
        }
        return creatables;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationAttributeEntity[]> {
        const creatables = await this.create(options);
        return await this.applicationAttributesRepository.save(creatables);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationAttributeEntity> {
        const creatables = await this.create(options);
        return (await this.applicationAttributesRepository.save(creatables))[0];
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const keys = Object.keys({
            ...options.body.applicantData,
            ...options.body.applicantSocials,
        });
        if (!options.params.application) {
            throw new ApplicationNotFoundException();
        }
        const attributes = await this.applicationAttributesRepository.findBy({
            applicaion: { id: options.params.application },
            key: In(keys),
        });

        await this.applicationAttributesRepository.remove(attributes);
    }
}
