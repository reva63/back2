import { Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { Attachment } from 'src/core/attachments/entities/attachment.abstract';

@Entity()
export class PostAttachmentEntity extends Attachment {
    @ManyToOne(() => PostEntity, (post) => post.attachments)
    post: PostEntity;
}
