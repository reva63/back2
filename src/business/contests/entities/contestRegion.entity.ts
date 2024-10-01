import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contest } from './contest.entity';

@Entity()
export class ContestRegionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    region: string;

    @Column()
    city: string;

    @Column()
    postalCode: number;

    @ManyToOne(() => Contest, (contest) => contest.regions)
    contest: Contest;
}
