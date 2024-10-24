import { MessageEntity } from 'src/business/messages/entities/message.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    editedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;

    @OneToMany(() => MessageEntity, (message) => message.chat)
    messages: MessageEntity[];

    @OneToOne(() => UserEntity, (user) => user.userChat, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserEntity;

    @Column({ nullable: false })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.operatorChats, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    operator: UserEntity;
}
