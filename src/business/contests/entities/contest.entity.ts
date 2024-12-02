import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ContestAttributeEntity } from './contestAttribute.entity';
import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { StageEntity } from 'src/business/stages/entities/stage.entity';
import { CategoryEntity } from 'src/business/categories/entities/category.entity';
import { BlockEntity } from 'src/business/blocks/entities/block.entity';
import { ParagraphEntity } from './paragraph.entity';
import { DirectionEntity } from 'src/business/directions/entities/direction.entity';
import { SeasonEntity } from 'src/business/seasons/entities/season.entity';

@Entity()
export class ContestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column('varchar')
    preview: string;

    @Column('varchar')
    title: string;

    @Column('text')
    description: string;

    @Column('numeric', { default: 0 })
    views: number;

    @OneToMany(() => ContestAttributeEntity, (attribute) => attribute.contest)
    attributes: ContestAttributeEntity[];

    @OneToMany(() => ParagraphEntity, (paragraph) => paragraph.contest, {
        cascade: ['insert', 'remove'],
    })
    paragraphs: ParagraphEntity[];

    @ManyToMany(() => BlockEntity, (block) => block.contests)
    @JoinTable()
    blocks: BlockEntity[];

    @OneToMany(() => StageEntity, (stage) => stage.contest)
    stages: StageEntity[];

    @OneToMany(() => CertificateEntity, (certificate) => certificate.contest)
    certificates: CertificateEntity[];

    @OneToMany(() => DirectionEntity, (direction) => direction.contest)
    directions: CategoryEntity[];

    @OneToMany(() => CategoryEntity, (category) => category.contest)
    categories: CategoryEntity[];

    @OneToMany(() => ApplicationEntity, (application) => application.contest)
    applications: ApplicationEntity[];

    @ManyToOne(() => SeasonEntity, (season) => season.contests)
    season: SeasonEntity;
}
