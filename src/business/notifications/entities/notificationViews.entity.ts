import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationEntity } from './notification.entity';

@Entity()
export class NotificationViewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: false })
    wasViewed: boolean;

    @ManyToOne(() => NotificationEntity, (notification) => notification.views, {
        nullable: false,
    })
    notification: NotificationEntity;

    @ManyToOne(() => UserEntity, (user) => user.notificationViews, {
        nullable: false,
    })
    user: UserEntity;
}
