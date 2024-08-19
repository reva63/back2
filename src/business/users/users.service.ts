import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserBodyDto } from './dto/update/updateUser.body.dto';
import { ServiceInterface } from 'src/core/abstract/base/service.interface';
import { UserResponse } from './interfaces/user-response.interface';
import { UpdateUserParamsDto } from './dto/update/updateUser.params.dto';
import { CreateUserBodyDto } from './dto/create/createUser.body.dto';
import { CreateUserParamsDto } from './dto/create/createUser.params.dto';
import { GetUsersParamsDto } from './dto/get/getUsers.params.dto';
import { GetUserByIdParamsDto } from './dto/get/getUserById.params.dto';
import { DeleteUserParamsDto } from './dto/delete/deleteUser.params.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationTopics } from '../notifications/types/notificationTopics.enum';
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class UsersSevice implements ServiceInterface<UserResponse> {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly notificationsService: NotificationsService,
    ) {}

    async store(params: CreateUserParamsDto, body: CreateUserBodyDto) {
        const user: User = this.usersRepository.create(body);
        const { id, email, role }: User = await this.usersRepository.save(user);
        return { id, email, role } as UserResponse;
    }

    async list(params: GetUsersParamsDto) {
        const users = await this.usersRepository.find();

        const notification_data = {
            title: 'test notification',
            message: 'notification',
        };

        this.notificationsService.sendNotification(
            NotificationTopics.Info,
            notification_data,
        );

        return users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                role: user.role,
            } as UserResponse;
        });
    }

    async show(params: GetUserByIdParamsDto) {
        const { id } = params;
        const user: User = await this.usersRepository.findOneBy({
            id,
        });
        if (!user) {
            throw new NotFoundException();
        }

        const { email, role } = user;
        return { id, email, role } as UserResponse;
    }

    async update(params: UpdateUserParamsDto, body: UpdateUserBodyDto) {
        const { id } = params;
        return Boolean(
            await this.usersRepository.update({ id }, body).catch(() => {
                throw new BadRequestException();
            }),
        );
    }

    async remove(params: DeleteUserParamsDto) {
        const { id } = params;
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException();
        }
        return Boolean(await this.usersRepository.remove(user));
    }
}
