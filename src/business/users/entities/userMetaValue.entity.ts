import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserMetaAttributeEntity } from './userMetaAttribute.entity';

@Entity('user_value')
export class UserMetaValue {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    value_text: string;

    @Column({ type: 'int', nullable: true })
    value_integer: number;

    @Column({ type: 'boolean', nullable: true })
    value_boolean: number;

    @Column({ type: 'float', nullable: true })
    value_float: number;

    @Column({ type: 'date', nullable: true })
    value_date: Date;

    @Column({ type: 'time', nullable: true })
    value_time: Date;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => UserMetaAttributeEntity, (attribute) => attribute.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'attribute_id' })
    attribute: UserMetaAttributeEntity;
}
