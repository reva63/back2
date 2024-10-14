import { AttributeTypes } from 'src/core/types/profileAttributeTypes.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AttributeEntityAbstract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: AttributeTypes })
    type: AttributeTypes;

    @Column('varchar')
    key: string;

    @Column('varchar', { nullable: true })
    value: string;
}
