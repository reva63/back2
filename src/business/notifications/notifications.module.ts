import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Notification])],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}
