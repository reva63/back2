import { Contest } from 'src/business/contests/entities/contest.entity';
import { User } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationReviewStatus } from '../types/applicationReviewStatus.enum';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isAsParticipant: boolean;

    @Column({
        type: 'enum',
        enum: ApplicationReviewStatus,
        default: ApplicationReviewStatus.OnReview,
    })
    reviewStatus: ApplicationReviewStatus;

    @ManyToOne(() => Contest, (contest) => contest.applications)
    contest: Contest;

    @ManyToOne(() => User, (user) => user.applications)
    user: User;
}
