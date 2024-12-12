import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    country: string;

    @Column('varchar')
    region: string;

    @Column('varchar', { nullable: true })
    city: string | null;

    @OneToOne(() => UserEntity, (user) => user.address)
    @JoinColumn()
    user: UserEntity;
}
