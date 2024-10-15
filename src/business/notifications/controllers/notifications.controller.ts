import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { RemoveNotificationParamsDto } from '../dto/remove/removeNotification.params.dto';
import { ShowNotificationParamsDto } from '../dto/show/ShowNotification.params.dto';
import { StoreNotificationBodyDto } from '../dto/store/storeNotification.body.dto';
import { StoreNotificationParamsDto } from '../dto/store/storeNotification.params.dto';
import { UpdateNotificationBodyDto } from '../dto/update/updateNotification.body.dto';
import { UpdateNotificationParamsDto } from '../dto/update/updateNotification.params.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { ListNotificationsQueryDto } from '../dto/list/listNotifications.query.dto';

@Controller('/notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {}

    @Get()
    async list(
        @Query() query: ListNotificationsQueryDto,
    ): Promise<NotificationEntity[]> {
        return await this.notificationsService.list({ query });
    }

    @Get('/:notification')
    async show(
        @Param() params: ShowNotificationParamsDto,
    ): Promise<NotificationEntity> {
        return this.notificationsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreNotificationParamsDto,
        @Body() body: StoreNotificationBodyDto,
    ): Promise<void | NotificationEntity> {
        return this.notificationsService.store({ params, body });
    }

    @Patch('/:notification')
    async update(
        @Param() params: UpdateNotificationParamsDto,
        @Body() body: UpdateNotificationBodyDto,
    ): Promise<NotificationEntity> {
        return await this.notificationsService.update({ params, body });
    }

    @Delete('/:notification')
    async remove(@Param() params: RemoveNotificationParamsDto): Promise<void> {
        await this.notificationsService.remove({ params });
    }
}
