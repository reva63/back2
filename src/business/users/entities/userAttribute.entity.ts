import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AttributeEntity } from 'src/business/attributes/entities/attribute.entity';

@Entity()
export class UserAttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => UserEntity, (user) => user.userAttributes, {
        nullable: false,
    })
    user: UserEntity;

    @ManyToOne(() => AttributeEntity, (attribute) => attribute.userAttributes, {
        nullable: false,
    })
    attribute: AttributeEntity;
}
