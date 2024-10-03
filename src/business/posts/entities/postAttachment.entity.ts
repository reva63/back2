import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class PostAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @ManyToOne(() => PostEntity, (post) => post.attachments)
    post: PostEntity;
}
