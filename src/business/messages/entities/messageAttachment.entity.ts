import { Entity, ManyToOne } from 'typeorm';
import { MessageEntity } from './message.entity';
import { AttachmentEntityAbstract } from 'src/core/abstract/entities/attachment.entity.abstract';

@Entity()
export class MessageAttachmentEntity extends AttachmentEntityAbstract {
    @ManyToOne(() => MessageEntity, (message) => message.attachments)
    message: MessageEntity;
}
