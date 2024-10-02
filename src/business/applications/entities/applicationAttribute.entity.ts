import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity()
export class ApplicationAttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column('varchar')
    key: string;

    @Column('varchar')
    value: string;

    @ManyToOne(() => ApplicationEntity, (application) => application.attributes)
    applicaion: ApplicationEntity;
}
