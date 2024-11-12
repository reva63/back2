import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    value: number;

    @ManyToOne(() => ApplicationEntity, (application) => application.ratings)
    applicaion: ApplicationEntity;

    @ManyToOne(() => UserEntity, (user) => user.ratings)
    expert: UserEntity;
}
