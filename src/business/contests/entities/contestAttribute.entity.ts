import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ContestEntity } from './contest.entity';

@Entity()
export class ContestAttributeEntity {
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
    value: string;

    @ManyToOne(() => ContestEntity, (contest) => contest.attributes)
    contest: ContestEntity;
}
