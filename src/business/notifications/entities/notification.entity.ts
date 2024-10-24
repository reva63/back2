import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    editedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;

    @Column('varchar')
    title: string;

    @Column('varchar')
    text: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    receiver: UserEntity;
}
