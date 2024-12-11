import { UserEntity } from 'src/business/users/entities/user.entity';
import { NotificationTypes } from 'src/core/types/notificationTypes.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationViewEntity } from './notificationViews.entity';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: NotificationTypes,
        default: NotificationTypes.Other,
    })
    type: NotificationTypes;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column('varchar')
    title: string;

    @Column('text')
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications, {
        nullable: true,
    })
    author: UserEntity;

    @OneToMany(() => NotificationViewEntity, (view) => view.notification, {
        cascade: ['remove'],
    })
    views: NotificationViewEntity[];
}
