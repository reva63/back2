import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { ProfileEntity } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { ProfileAttributesService } from './profileAttributes.service';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { ProfileNotFoundException } from 'src/exceptions/profiles/profileNotFound.exception';

@Injectable()
export class ProfilesService implements IService<ProfileEntity> {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profilesRepository: Repository<ProfileEntity>,
        private readonly profileAttributesService: ProfileAttributesService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ProfileEntity[]> {
        return await this.profilesRepository.find({
            relations: { attributes: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ProfileEntity> {
        return await this.profilesRepository.findOne({
            where: { id: options.params.profile },
            relations: { attributes: true, user: true },
        });
    }

    async create(
        options: {
            params?: IParamsDto;
            body?: IBodyDto;
        },
        isUpdate?: boolean,
    ): Promise<DeepPartial<ProfileEntity>> {
        const user = { id: options.params.user };

        return this.profilesRepository.create({
            ...options.body,
            id: isUpdate ? options.params.profile : undefined,
            user,
        });
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ProfileEntity> {
        const attributes = options.body.upsertAttributes?.length
            ? await this.profileAttributesService.create(options)
            : undefined;
        const creatable = await this.create(options);
        return await this.profilesRepository.save({ ...creatable, attributes });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ProfileEntity> {
        const profile = await this.profilesRepository.findOneBy({
            id: options.params.profile,
        });
        if (!profile) {
            throw new ProfileNotFoundException();
        }
        const creatable = await this.create(options, true);

        if (options.body.upsertAttributes?.length > 0) {
            await this.profileAttributesService.update(options);
        }

        if (options.body.removeAttributes?.length > 0) {
            await this.profileAttributesService.remove(options);
        }

        await this.profilesRepository.update(
            { id: profile.id },
            { ...creatable },
        );
        return await this.profilesRepository.findOne({
            where: { id: profile.id },
            relations: { attributes: true },
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const profile = await this.profilesRepository.findOneBy({
            id: options.params.profile,
        });
        if (!profile) {
            throw new ProfileNotFoundException();
        }

        await this.profilesRepository.remove(profile);
    }
}
