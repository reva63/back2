import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column('integer')
    value: number;

    @ManyToOne(() => ApplicationEntity, (application) => application.ratings)
    applicaion: ApplicationEntity;

    @ManyToOne(() => UserEntity, (user) => user.ratings)
    expert: UserEntity;
}
