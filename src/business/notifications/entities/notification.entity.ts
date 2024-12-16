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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class NotificationEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: NotificationTypes,
        default: NotificationTypes.Other,
    })
    type: NotificationTypes;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @ApiProperty()
    @Column('varchar')
    title: string;

    @ApiProperty()
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
