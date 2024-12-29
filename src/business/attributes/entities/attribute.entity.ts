import { ApiProperty } from '@nestjs/swagger';
import { UserAttributeEntity } from 'src/business/users/entities/userAttribute.entity';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttributeEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'text' })
    name: string;

    @ApiProperty({ enum: AttributeTypes })
    @Column({
        type: 'enum',
        enum: AttributeTypes,
    })
    type: AttributeTypes;

    @ApiProperty()
    @Column('text', { nullable: true })
    comment: string | null;

    @OneToMany(
        () => UserAttributeEntity,
        (userAttribute) => userAttribute.attribute,
    )
    userAttributes: UserAttributeEntity[];
}
