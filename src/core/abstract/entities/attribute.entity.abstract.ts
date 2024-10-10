import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AttributeEntityAbstract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    value: string;
}
