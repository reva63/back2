import { ChatEntity } from 'src/business/chats/entities/chat.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MessageAttachmentEntity } from './messageAttachment.entity';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    chat: ChatEntity;

    @ManyToOne(() => UserEntity, (user) => user.messages)
    author: UserEntity;

    @OneToMany(
        () => MessageAttachmentEntity,
        (attachment) => attachment.message,
    )
    attachments: MessageAttachmentEntity[];
}
