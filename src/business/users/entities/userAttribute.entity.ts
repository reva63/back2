import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserAttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    value: string;

    @ManyToOne(() => UserEntity, (user) => user.attributes)
    user: UserEntity;
}
