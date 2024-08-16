import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServiceInterface } from 'src/core/abstract/base/service.interface';
import { ParamsDtoInterface } from 'src/core/abstract/base/dto/paramsDto.interface';
import { UserResponse } from './interfaces/user-response.interface';

@Injectable()
export class UsersSevice implements ServiceInterface<UserResponse> {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async store(params: ParamsDtoInterface, body: CreateUserDto) {
        const user: User = this.usersRepository.create(body);
        const { id, email, role }: User = await this.usersRepository.save(user);
        return { id, email, role } as UserResponse;
    }

    async list(params: ParamsDtoInterface) {
        const users = await this.usersRepository.find();
        return users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                role: user.role,
            } as UserResponse;
        });
    }

    async show({ id }: ParamsDtoInterface) {
        const user: User = await this.usersRepository.findOneBy({
            id,
        });
        if (!user) {
            throw new NotFoundException();
        }

        const { email, role } = user;
        return { id, email, role } as UserResponse;
    }

    async update({ id }: ParamsDtoInterface, body: UpdateUserDto) {
        return Boolean(
            await this.usersRepository.update({ id }, body).catch(() => {
                throw new BadRequestException();
            }),
        );
    }

    async remove({ id }: ParamsDtoInterface) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException();
        }
        return Boolean(await this.usersRepository.remove(user));
    }
}
