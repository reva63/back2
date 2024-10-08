import { CategoryEntity } from 'src/business/categories/entities/category.entity';
import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import { DirectionEntity } from 'src/business/directions/entities/direction.entity';
import { StageEntity } from 'src/business/stages/entities/stage.entity';
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
export class CertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column('varchar')
    key: string;

    @Column('varchar')
    name: string;

    @ManyToOne(() => ContestEntity, (contest) => contest.certificates)
    contest: ContestEntity;

    @ManyToOne(() => StageEntity, (stage) => stage.certificates)
    stage: StageEntity;

    @ManyToOne(() => UserEntity, (user) => user.certificates)
    user: UserEntity;

    @ManyToOne(() => DirectionEntity, (direction) => direction.certificates)
    direction: DirectionEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.certificates)
    category: CategoryEntity;
}
