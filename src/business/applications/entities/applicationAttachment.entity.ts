import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity()
export class ApplicationAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    link: string;

    @Column('varchar')
    name: string;

    @ManyToOne(
        () => ApplicationEntity,
        (application) => application.attachments,
    )
    application: ApplicationEntity;
}
