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
} from 'typeorm';
import { MessageAttachmentEntity } from './messageAttachment.entity';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    editedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => ChatEntity, (chat) => chat.messages, {
        onDelete: 'CASCADE',
    })
    chat: ChatEntity;

    @Column({ nullable: false })
    chatId: number;

    @ManyToOne(() => UserEntity, (user) => user.messages)
    author: UserEntity;

    @Column({ nullable: false })
    authorId: number;

    @OneToMany(
        () => MessageAttachmentEntity,
        (attachment) => attachment.message,
        { cascade: ['insert', 'soft-remove'] },
    )
    attachments: MessageAttachmentEntity[];
}
