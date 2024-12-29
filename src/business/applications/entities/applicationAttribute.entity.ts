import { Entity, ManyToOne } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { AttributeEntityAbstract } from 'src/core/abstract/entities/attribute.entity.abstract';

@Entity()
export class ApplicationAttributeEntity extends AttributeEntityAbstract {
    @ManyToOne(
        () => ApplicationEntity,
        (application) => application.attributes,
        {
            onDelete: 'CASCADE',
        },
    )
    applicaion: ApplicationEntity;
}
