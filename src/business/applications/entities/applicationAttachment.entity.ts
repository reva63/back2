import { Entity, ManyToOne } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { Attachment } from 'src/core/attachments/entities/attachment.abstract';

@Entity()
export class ApplicationAttachmentEntity extends Attachment {
    @ManyToOne(
        () => ApplicationEntity,
        (application) => application.attachments,
    )
    application: ApplicationEntity;
}
