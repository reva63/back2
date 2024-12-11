import { UserAttributeEntity } from 'src/business/users/entities/userAttribute.entity';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({
        type: 'enum',
        enum: AttributeTypes,
    })
    type: AttributeTypes;

    @OneToMany(
        () => UserAttributeEntity,
        (userAttribute) => userAttribute.attribute,
    )
    userAttributes: UserAttributeEntity[];
}
