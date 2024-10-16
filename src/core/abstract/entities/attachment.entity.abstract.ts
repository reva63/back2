import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AttachmentEntityAbstract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    link: string;

    @Column('varchar')
    originalName: string;
}
