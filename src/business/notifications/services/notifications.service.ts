import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { NotificationEntity } from '../entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';
import { NotificationNotFoundException } from 'src/exceptions/notifications/notificationNotFound.exception';
import { UsersService } from 'src/business/users/services/users.service';
import { UserNotFoundException } from 'src/exceptions/users/userNotFound.exception';

@Injectable()
export class NotificationsService implements IService<NotificationEntity> {
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationsRepository: Repository<NotificationEntity>,
        private usersService: UsersService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<NotificationEntity[]> {

        return await this.notificationsRepository.find({
            relations: { receiver: true },
            where: {
                receiver: {
                    id: options.query.user,
                },
            },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<NotificationEntity> {
        const notification = await this.notificationsRepository.findOneBy({
            id: options.params.notification,
        });
        if (!notification) {
            throw new NotificationNotFoundException();
        }
        return notification;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<NotificationEntity> {
        const user = await this.usersService.show({
            params: { user: options.body.reciever },
        });
        if (!user) {
            throw new UserNotFoundException();
        }

        const creatable = {
            title: options.body.title,
            text: options.body.text,
            receiver: user,
        } as DeepPartial<NotificationEntity>;
        return await this.notificationsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<NotificationEntity> {

        const creatable = {
            title: options.body.title,
            text: options.body.text,
        } as DeepPartial<NotificationEntity>;

        await this.notificationsRepository.update(
            { id: options.params.direction },
            creatable,
        );

        return await this.notificationsRepository.findOneBy({
            id: options.params.notification,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const notification = await this.notificationsRepository.findOneBy({
            id: options.params.notification,
        });
        if (!notification) {
            throw new NotificationNotFoundException();
        }
        await this.notificationsRepository.remove(notification);
    }
}
