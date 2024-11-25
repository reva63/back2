import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';
import { UsersService } from 'src/business/users/services/users.service';
import { UserNotFoundException } from 'src/exceptions/users/userNotFound.exception';
import { BannerNotFoundException } from 'src/exceptions/banners/bannerNotFound.exception';
import { BannerEntity } from '../entities/banner.entity';

@Injectable()
export class BannersService implements IService<BannerEntity> {
    constructor(
        @InjectRepository(BannerEntity)
        private bannersRepository: Repository<BannerEntity>,
        private usersService: UsersService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<BannerEntity[]> {
        return await this.bannersRepository.find({
            relations: { user: true },
            where: {
                user: {
                    id: options.query.user,
                },
            },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<BannerEntity> {
        const banner = await this.bannersRepository.findOneBy({
            id: options.params.banner,
        });
        if (!banner) {
            throw new BannerNotFoundException();
        }
        return banner;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<BannerEntity> {
        const user = await this.usersService.show({
            params: { user: options.body.user },
        });
        if (!user) {
            throw new UserNotFoundException();
        }

        const creatable = {
            header: options.body.header,
            text: options.body.text,
            buttonText: options.body.buttonText,
            buttonUrl: options.body.buttonUrl,
            user,
        } as DeepPartial<BannerEntity>;
        return await this.bannersRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<BannerEntity> {
        const creatable = {
            header: options.body.header,
            text: options.body.text,
            buttonText: options.body.buttonText,
            buttonUrl: options.body.buttonUrl,
        } as DeepPartial<BannerEntity>;

        await this.bannersRepository.update(
            { id: options.params.direction },
            creatable,
        );

        return await this.bannersRepository.findOneBy({
            id: options.params.banner,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const banner = await this.bannersRepository.findOneBy({
            id: options.params.banner,
        });
        if (!banner) {
            throw new BannerNotFoundException();
        }
        await this.bannersRepository.remove(banner);
    }
}
