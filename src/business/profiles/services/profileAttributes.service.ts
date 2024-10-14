import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileAttributeEntity } from '../entities/profileAttributes.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

@Injectable()
export class ProfileAttributesService
    implements IService<ProfileAttributeEntity>
{
    constructor(
        @InjectRepository(ProfileAttributeEntity)
        private readonly profileAttributesRepository: Repository<ProfileAttributeEntity>,
    ) {}

    async create(
        options: {
            params?: IParamsDto;
            body?: IBodyDto;
        },
        isUpdate?: boolean,
    ): Promise<DeepPartial<ProfileAttributeEntity>[]> {
        const attributes = [] as DeepPartial<ProfileAttributeEntity>[];
        const profile = isUpdate ? { id: options.params.profile } : undefined;
        for (const attribute of options.body.upsertAttributes) {
            const creatable = {
                id: isUpdate ? attribute.id : undefined,
                type: attribute.type,
                key: attribute.name,
                value: attribute.value,
                profile,
            } as DeepPartial<ProfileAttributeEntity>;

            attributes.push(creatable);
        }

        return attributes;
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ProfileAttributeEntity[]> {
        const creatables = await this.create(options, true);
        return await this.profileAttributesRepository.save(creatables);
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const paragraphs = await this.profileAttributesRepository.findBy({
            id: In(options.body.removeAttributes),
        });
        await this.profileAttributesRepository.remove(paragraphs);
    }
}
