import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @ManyToMany(() => ContestEntity, (contest) => contest.blocks)
    contests: ContestEntity[];
}
