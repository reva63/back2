import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    link: string;

    @Column('varchar')
    storedName: string;
}
