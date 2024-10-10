import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AttributeEntityAbstract } from 'src/core/abstract/entities/attribute.entity.abstract';

@Entity()
export class UserAttributeEntity extends AttributeEntityAbstract {
    @ManyToOne(() => UserEntity, (user) => user.attributes, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;
}
