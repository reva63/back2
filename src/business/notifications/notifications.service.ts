import { Injectable } from '@nestjs/common';
import { WebSocketService } from './websocket.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './types/notificationType.enum';
import { NotificationStatus } from './types/notificationStatus.enum';
import { PayloadDtoInterface } from 'src/core/abstract/notifications/dto/payloadDto.interface';
import { NotificationsInterface } from 'src/core/abstract/notifications/notificationsService.interface';
import { UNIX_TIME_TRANSFORMER } from './common/constants/unixTransformer.constants';

@Injectable()
export class NotificationsService implements NotificationsInterface {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly webSocketService: WebSocketService,
    ) {}

    async sendNotification(topic: string, payload: PayloadDtoInterface) {
        // in future id will be changed, now it hardcoded
        const user = await this.userRepository.findOneBy({ id: 2 });

        if (!user) {
            throw new Error('User not found!');
        }

        const now = new Date();
        const notificationData = {
            type: topic.split('.')[1] as NotificationType,
            title: payload.title,
            message: payload.message,
            status: NotificationStatus.Unread,
            create_at: UNIX_TIME_TRANSFORMER.to(now),
            update_at: UNIX_TIME_TRANSFORMER.to(now),
            user: user,
        };

        const notification =
            this.notificationRepository.create(notificationData);

        const { title, message, create_at } =
            await this.notificationRepository.save(notification);

        this.webSocketService.emitNotification(topic, {
            title,
            message,
            created_at: UNIX_TIME_TRANSFORMER.from(create_at),
        });
    }
}
