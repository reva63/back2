import { Entity, ManyToOne } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { AttachmentEntityAbstract } from 'src/core/abstract/entities/attachment.entity.abstract';

@Entity()
export class ApplicationAttachmentEntity extends AttachmentEntityAbstract {
    @ManyToOne(
        () => ApplicationEntity,
        (application) => application.attachments,
    )
    application: ApplicationEntity;
}
