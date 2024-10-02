import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

export class PostAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @ManyToOne(() => PostEntity, (post) => post.attachments)
    post: PostEntity
}