import { Injectable } from '@nestjs/common';
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { ServiceInterface } from 'src/core/abstract/notifications/service.interface';
import { NotificationType } from './types/notificationType.enum';
import { NotificationStatus } from './types/notificationStatus.enum';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UNIX_TIME_TRANSFORMER } from './common/constants/unixTransformer.constants';
import { PayloadDtoInterface } from 'src/core/abstract/notifications/dto/payloadDto.interface';

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'notifications',
})
export class NotificationsService implements ServiceInterface {
    @WebSocketServer()
    private readonly server: Server;

    constructor(
        @InjectRepository(Notification)
        private readonly notifRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    handleConnection(client: Socket) {
        try {
            console.log(client.id);
            console.log('connected');
        } catch (error) {
            console.error('Connection error:', error);
            client.disconnect(true);
        }
    }

    handleDisconnect(client: Socket) {
        try {
            console.log(client.id);
            console.log('disconnected');
        } catch (error) {
            console.error('Disconnection error:', error);
        }
    }

    async sendNotification(topic: string, payload: PayloadDtoInterface) {
        const user = await this.userRepository.findOneBy({ id: 1 });

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
            expiration_date: UNIX_TIME_TRANSFORMER.to(now),
            user,
        };

        const notification = this.notifRepository.create(notificationData);

        const { title, message, create_at } =
            await this.notifRepository.save(notification);

        this.server.emit('notifications', {
            topic,
            data: {
                title,
                message,
                create_at: UNIX_TIME_TRANSFORMER.from(create_at),
            },
        });
    }
}
