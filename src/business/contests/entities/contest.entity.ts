import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ContestAttributeEntity } from './contestAttribute.entity';
import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { StageEntity } from 'src/business/stages/entities/stage.entity';
import { CategoryEntity } from 'src/business/categories/entities/category.entity';
import { BlockEntity } from 'src/business/blocks/entities/block.entity';

@Entity()
export class ContestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column('varchar')
    preview: string;

    @Column('varchar')
    title: string;

    @Column('text')
    description: string;

    @OneToMany(() => ContestAttributeEntity, (attribute) => attribute.contest)
    attributes: ContestAttributeEntity[];

    @ManyToMany(() => BlockEntity, (block) => block.contests)
    blocks: BlockEntity[];

    @OneToMany(() => StageEntity, (stage) => stage.contest)
    stages: StageEntity[];

    @OneToMany(() => CertificateEntity, (certificate) => certificate.contest)
    certificates: CertificateEntity[];

    @OneToMany(() => CategoryEntity, (category) => category.contest)
    categories: CategoryEntity[];

    @OneToMany(() => ApplicationEntity, (application) => application.contest)
    applications: ApplicationEntity[];
}
