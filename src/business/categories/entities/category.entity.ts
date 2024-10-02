import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
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
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @ManyToOne(() => ContestEntity, (contest) => contest.categories)
    contest: ContestEntity;

    @OneToMany(() => CertificateEntity, (certificate) => certificate.category)
    certificates: CertificateEntity[];

    @OneToMany(() => ApplicationEntity, (application) => application.category)
    applications: ApplicationEntity[];
}
