import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { ContestEntity } from 'src/business/contests/entities/contest.entity';
import { DirectionEntity } from 'src/business/directions/entities/direction.entity';
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
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @ManyToOne(() => DirectionEntity, (direction) => direction.categories, {
        onDelete: 'CASCADE',
    })
    direction: DirectionEntity;

    @ManyToOne(() => ContestEntity, (contest) => contest.categories)
    contest: ContestEntity;

    @OneToMany(() => CertificateEntity, (certificate) => certificate.category)
    certificates: CertificateEntity[];

    @ManyToMany(
        () => ApplicationEntity,
        (application) => application.categories,
    )
    @JoinTable()
    applications: ApplicationEntity[];
}
