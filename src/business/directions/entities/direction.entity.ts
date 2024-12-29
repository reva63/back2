import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { CategoryEntity } from 'src/business/categories/entities/category.entity';
import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DirectionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @OneToMany(() => CategoryEntity, (category) => category.direction, {
        cascade: ['remove'],
    })
    categories: CategoryEntity[];

    @ManyToOne(() => ContestEntity, (contest) => contest.directions)
    contest: ContestEntity;

    @OneToMany(() => CertificateEntity, (certificate) => certificate.direction)
    certificates: CertificateEntity[];

    @ManyToMany(
        () => ApplicationEntity,
        (application) => application.directions,
    )
    @JoinTable()
    applications: ApplicationEntity[];
}
