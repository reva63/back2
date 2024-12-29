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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('/notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {}

    @ApiOperation({ summary: 'List notifications' })
    @ApiResponse({ status: 200, type: [NotificationEntity] })
    @Get()
    async list(
        @Query() query: ListNotificationsQueryDto,
    ): Promise<NotificationEntity[]> {
        return await this.notificationsService.list({ query });
    }

    @ApiOperation({ summary: 'Show notification' })
    @ApiResponse({ status: 200, type: NotificationEntity })
    @ApiResponse({ status: 404, description: 'Notification not found' })
    @Get('/:notification')
    async show(
        @Param() params: ShowNotificationParamsDto,
    ): Promise<NotificationEntity> {
        return this.notificationsService.show({ params });
    }

    @ApiOperation({ summary: 'Store notification' })
    @ApiResponse({ status: 200, type: NotificationEntity })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Post()
    async store(
        @Param() params: StoreNotificationParamsDto,
        @Body() body: StoreNotificationBodyDto,
    ): Promise<void | NotificationEntity> {
        return this.notificationsService.store({ params, body });
    }

    @ApiOperation({ summary: 'Update notification' })
    @ApiResponse({ status: 200, type: NotificationEntity })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 404, description: 'Notification not found' })
    @Patch('/:notification')
    async update(
        @Param() params: UpdateNotificationParamsDto,
        @Body() body: UpdateNotificationBodyDto,
    ): Promise<NotificationEntity> {
        return await this.notificationsService.update({ params, body });
    }

    @ApiOperation({ summary: 'Remove notification' })
    @ApiResponse({ status: 200, description: 'Notification removed' })
    @ApiResponse({ status: 404, description: 'Notification not found' })
    @Delete('/:notification')
    async remove(@Param() params: RemoveNotificationParamsDto): Promise<void> {
        await this.notificationsService.remove({ params });
    }
}
