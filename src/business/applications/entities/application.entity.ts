import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApplicationAttachmentEntity } from './applicationAttachment.entity';
import { ApplicationAttributeEntity } from './applicationAttribute.entity';
import { RatingEntity } from 'src/business/ratings/entities/rating.entity';
import { CategoryEntity } from 'src/business/categories/entities/category.entity';
import { DirectionEntity } from 'src/business/directions/entities/direction.entity';

@Entity()
export class ApplicationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(
        () => ApplicationAttributeEntity,
        (attribute) => attribute.applicaion,
        {
            cascade: ['remove', 'insert'],
        },
    )
    attributes: ApplicationAttributeEntity[];

    @OneToMany(
        () => ApplicationAttachmentEntity,
        (attachment) => attachment.application,
    )
    attachments: ApplicationAttachmentEntity[];

    @ManyToOne(() => UserEntity, (user) => user.applications)
    applicant: UserEntity;

    @ManyToOne(() => ContestEntity, (contest) => contest.applications)
    contest: ContestEntity;

    @ManyToMany(() => DirectionEntity, (direction) => direction.applications)
    directions: DirectionEntity[];

    @ManyToMany(() => CategoryEntity, (category) => category.applications)
    category: CategoryEntity[];

    @OneToMany(() => RatingEntity, (rating) => rating.applicaion)
    ratings: RatingEntity[];
}
