import { join } from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationStatus } from './types/notificationStatus.enum';
import { CronJobInterface } from 'src/core/abstract/notifications/cronjobService.interface';
import { UNIX_TIME_TRANSFORMER } from './common/constants/unixTransformer.constants';

@Injectable()
export class CronJobService implements CronJobInterface {
    constructor(
        @InjectRepository(Notification)
        private readonly notifRepository: Repository<Notification>,
        private readonly mailerService: MailerService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleUnseenNotifications() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const notifications = await this.notifRepository
            .createQueryBuilder('notification')
            .select(['notification', 'user.email'])
            .leftJoin('notification.user', 'user')
            .where('notification.status = :status', {
                status: NotificationStatus.Unread,
            })
            .andWhere('notification.create_at < :oneWeekAgo', {
                oneWeekAgo: UNIX_TIME_TRANSFORMER.to(oneWeekAgo),
            })
            .getMany();

        if (notifications.length > 0) {
            await this.notifRepository.update(
                {
                    id: In(notifications.map((n) => n.id)),
                },
                {
                    status: NotificationStatus.Archived,
                },
            );

            try {
                await Promise.all(
                    notifications.map((notification) =>
                        this.mailerService.sendMail({
                            to: notification.user.email,
                            subject: 'Оповещение',
                            template: join(
                                __dirname,
                                'templates',
                                'basic_template',
                            ),
                        }),
                    ),
                );
            } catch (e) {
                throw new HttpException(
                    `Mailer error: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            }
        }
    }
}
