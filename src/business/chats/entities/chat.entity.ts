import { MessageEntity } from 'src/business/messages/entities/message.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => MessageEntity, (message) => message.chat)
    messages: MessageEntity[];

    @OneToOne(() => UserEntity, (user) => user.userChat)
    user: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.operatorChats, {
        nullable: true,
    })
    operator: UserEntity;
}
