import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contest } from './contest.entity';

@Entity()
export class ContestStage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    sortOrder: number;

    @Column({ type: 'bigint' })
    startDate: Date;

    @Column({ type: 'bigint' })
    endDate: Date;

    @Column()
    competitionType: string;

    @Column()
    isMediaNecessary: boolean;

    @Column()
    isRatingAssumed: boolean;

    @Column({ type: 'bigint', nullable: true, default: null })
    ratingStartDate: Date;

    @Column({ type: 'bigint', nullable: true, default: null })
    ratingEndDate: Date;

    @Column()
    maximumParticipators: number;

    @ManyToOne(() => Contest, (contest) => contest.stages)
    contest: Contest;
}
