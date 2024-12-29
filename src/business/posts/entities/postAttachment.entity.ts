import { Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { AttachmentEntityAbstract } from 'src/core/abstract/entities/attachment.entity.abstract';

@Entity()
export class PostAttachmentEntity extends AttachmentEntityAbstract {
    @ManyToOne(() => PostEntity, (post) => post.attachments)
    post: PostEntity;
}
