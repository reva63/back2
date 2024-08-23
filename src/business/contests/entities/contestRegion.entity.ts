import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Contest } from './contest.entity';
import { Application } from 'src/business/applications/entities/application.entity';

@Entity()
export class ContestRegion {
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
