import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IService } from 'src/core/abstract/base/service.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService implements IService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<UserEntity[]> {
        return await this.usersRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        return user ?? null;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserEntity> {
        const creatable = {} as DeepPartial<UserEntity>;
        return await this.usersRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        if (!user) {
            throw new NotFoundException();
        }
        const creatable = {} as DeepPartial<UserEntity>;
        return Boolean(
            await this.usersRepository.update({ id: user.id }, creatable),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        if (!user) {
            throw new NotFoundException();
        }

        return Boolean(await this.usersRepository.remove(user));
    }
}