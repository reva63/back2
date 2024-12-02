import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SeasonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    number: number;

    @Column('integer')
    year: number;

    @OneToMany(() => ContestEntity, (contest) => contest.season)
    contests: ContestEntity[];
}
