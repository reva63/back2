import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';
import { UsersModule } from '../users/users.module';
import { NotificationViewEntity } from './entities/notificationViews.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity, NotificationViewEntity]),
        UsersModule,
    ],
    providers: [NotificationsService],
    controllers: [NotificationsController],
})
export class NotificationsModule {}
