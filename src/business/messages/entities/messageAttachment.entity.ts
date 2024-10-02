import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity()
export class MessageAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    link: string;

    @Column('varchar')
    name: string;

    @ManyToOne(() => MessageEntity, (message) => message.attachments)
    message: MessageEntity;
}
