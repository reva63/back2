import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column('varchar')
    title: string;

    @Column('varchar')
    text: string;

    @Column('varchar')
    type: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    receiver: UserEntity;
}
