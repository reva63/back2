import { Entity, ManyToOne } from 'typeorm';
import { MessageEntity } from './message.entity';
import { Attachment } from 'src/core/attachments/entities/attachment.abstract';

@Entity()
export class MessageAttachmentEntity extends Attachment {
    @ManyToOne(() => MessageEntity, (message) => message.attachments)
    message: MessageEntity;
}
