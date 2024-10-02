import { MessageEntity } from 'src/business/messages/entities/message.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
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

    @ManyToOne(() => UserEntity, (user) => user.userChats)
    user: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.operatorChats)
    operator: UserEntity;
}
