import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IService } from 'src/core/abstract/base/service.interface';
import { Repository } from 'typeorm';
import { UserResponse } from './interfaces/userResponse.interface';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService implements IService<UserResponse> {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<UserResponse[]> {
        return await this.usersRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserResponse> {
        const user: User = await this.usersRepository.findOne({
            where: [
                {
                    id: options.params.user,
                },
                { email: options.body.email },
            ],
        });
        return user ?? null;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserResponse> {
        const creatable = {} as User;
        return await this.usersRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const user: User = await this.usersRepository.findOne({
            where: [{ id: options.params.user }, { email: options.body.email }],
        });
        if (!user) {
            throw new NotFoundException();
        }
        const creatable = {} as DeepPartial<User>;
        return Boolean(
            await this.usersRepository.update({ id: user.id }, creatable),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const user: User = await this.usersRepository.findOne({
            where: [{ id: options.params.user }, { email: options.body.email }],
        });
        if (!user) {
            throw new NotFoundException();
        }

        return Boolean(await this.usersRepository.remove(user));
    }
}
