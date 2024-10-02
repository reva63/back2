import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity()
export class ApplicationAttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    value: string;

    @ManyToOne(() => ApplicationEntity, (application) => application.attributes)
    applicaion: ApplicationEntity;
}
