import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { ApplicationAttributeEntity } from '../entities/applicationAttribute.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { ApplicationNotFoundException } from 'src/exceptions/applications/applicationNotFound.exception';
import { AttributeTypes } from 'src/core/types/profileAttributeTypes.enum';
import { ProfileAttributesService } from 'src/business/profiles/services/profileAttributes.service';

@Injectable()
export class ApplicationAttributesService
    implements IService<ApplicationAttributeEntity>
{
    constructor(
        @InjectRepository(ApplicationAttributeEntity)
        private readonly applicationAttributesRepository: Repository<ApplicationAttributeEntity>,
        private readonly profileAttributesService: ProfileAttributesService,
    ) {}

    async create(
        options: {
            params?: IParamsDto;
            body?: IBodyDto;
        },
        isUpdate?: boolean,
    ): Promise<DeepPartial<ApplicationAttributeEntity>[]> {
        const creatables = [] as DeepPartial<ApplicationAttributeEntity>[];

        for (const [key, value] of Object.entries(options.body.profileData)) {
            const creatable = {
                type: AttributeTypes.Profile,
                key,
                value,
            } as DeepPartial<ApplicationAttributeEntity>;
            creatables.push(creatable);
        }

        for (const social of options.body.socialData) {
            const creatable = {
                type: AttributeTypes.Social,
                key: social.type,
                value: social.link,
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
    }): Promise<ApplicationAttributeEntity[]> {
        const creatables = await this.create(options, true);
        return await this.applicationAttributesRepository.save(creatables);
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const keys = Object.keys({
            ...options.body.profileData,
            ...options.body.socialData,
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
