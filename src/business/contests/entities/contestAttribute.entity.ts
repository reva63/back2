import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContestEntity } from './contest.entity';

@Entity()
export class ContestAttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    value: string;

    @ManyToOne(() => ContestEntity, (contest) => contest.attributes)
    contest: ContestEntity;
}
