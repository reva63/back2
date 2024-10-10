import { AttributeEntityAbstract } from 'src/core/abstract/entities/attribute.entity.abstract';
import { Entity, ManyToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity()
export class ProfileAttributeEntity extends AttributeEntityAbstract {
    @ManyToOne(() => ProfileEntity, (profile) => profile.attributes, {
        onDelete: 'CASCADE',
    })
    profile: ProfileEntity;
}
