import {
    Index,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/entity.interface';
import { NotificationType } from '../types/notificationType.enum';
import { NotificationStatus } from '../types/notificationStatus.enum';
import { User } from 'src/business/users/entities/user.entity';

@Entity('Notification')
export class Notification implements EntityInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: NotificationType })
    type: NotificationType;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    message: string;

    @Column({ type: 'enum', enum: NotificationStatus })
    status: NotificationStatus;

    @Column({ type: 'bigint' })
    create_at: number;

    @Column({ type: 'bigint' })
    update_at: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @Index('idx_notification_user_id')
    user: User;
}
