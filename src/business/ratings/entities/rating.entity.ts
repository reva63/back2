import { EntityInterface } from 'src/core/abstract/base/ratings/entity.interface';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number;
}
