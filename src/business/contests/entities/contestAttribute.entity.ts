import { Entity, ManyToOne } from 'typeorm';
import { ContestEntity } from './contest.entity';
import { AttributeEntityAbstract } from 'src/core/abstract/entities/attribute.entity.abstract';

@Entity()
export class ContestAttributeEntity extends AttributeEntityAbstract {
    @ManyToOne(() => ContestEntity, (contest) => contest.attributes)
    contest: ContestEntity;
}
