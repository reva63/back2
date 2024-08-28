import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserBodyDto } from './dto/update/updateUser.body.dto';
import { ServiceInterface } from 'src/core/abstract/base/users/service.interface';
import { UserResponse } from './interfaces/userResponse.interface';
import { UpdateUserParamsDto } from './dto/update/updateUser.params.dto';
import { CreateUserBodyDto } from './dto/create/createUser.body.dto';
import { GetUsersParamsDto } from './dto/get/getUsers.params.dto';
import { GetUserByIdParamsDto } from './dto/get/getUserById.params.dto';
import { DeleteUserParamsDto } from './dto/delete/deleteUser.params.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService implements ServiceInterface<UserResponse> {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    async store(body: CreateUserBodyDto) {
        const roles = await Promise.all(
            body.roles.map((role) => this.rolesRepository.findOneBy({ role })),
        );
        const user = this.usersRepository.create({ email: body.email });
        user.roles = roles;

        return await this.usersRepository.save(user);
    }

    async list(params: GetUsersParamsDto) {
        return await this.usersRepository.find();
    }

    async show(params: GetUserByIdParamsDto) {
        const { idOrEmail } = params;
        if (!idOrEmail) {
            throw new BadRequestException();
        }
        const user: User = await this.usersRepository.findOne({
            where: [
                { id: this.isValidUUID(idOrEmail) ? idOrEmail : undefined },
                { email: idOrEmail },
            ],
        });
        return user ?? null;
    }

    async update(params: UpdateUserParamsDto, body: UpdateUserBodyDto) {
        const { idOrEmail } = params;
        const user: User = await this.usersRepository.findOne({
            where: [
                { id: this.isValidUUID(idOrEmail) ? idOrEmail : undefined },
                { email: idOrEmail },
            ],
        });
        if (!user) {
            throw new NotFoundException();
        }

        return Boolean(
            await this.usersRepository
                .update({ id: user.id }, body)
                .catch(() => {
                    throw new BadRequestException();
                }),
        );
    }

    async remove(params: DeleteUserParamsDto) {
        const { idOrEmail } = params;
        const user: User = await this.usersRepository.findOne({
            where: [
                { id: this.isValidUUID(idOrEmail) ? idOrEmail : undefined },
                { email: idOrEmail },
            ],
        });
        if (!user) {
            throw new NotFoundException();
        }

        return Boolean(await this.usersRepository.remove(user));
    }

    private isValidUUID(id: string) {
        const regex =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return regex.test(id);
    }
}
