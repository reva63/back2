import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @Column('varchar', { nullable: true })
    templateKey: string;

    @Column('timestamptz')
    startDate: Date;

    @Column('timestamptz')
    endDate: Date;

    @ManyToOne(() => ContestEntity, (contest) => contest.stages)
    contest: ContestEntity;

    @OneToMany(() => CertificateEntity, (certificate) => certificate.stage)
    certificates: CertificateEntity[];
}
