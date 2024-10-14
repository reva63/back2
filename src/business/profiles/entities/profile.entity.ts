import { UserEntity } from 'src/business/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileAttributeEntity } from './profileAttributes.entity';

@Entity()
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('varchar', { nullable: true })
    middleName: string | null;

    @Column('simple-enum', { enum: ['male', 'female'] })
    gender: 'male' | 'female';

    @Column()
    dateOfBirth: Date;

    @Column('varchar')
    citizenship: string;

    @Column('varchar')
    country: string;

    @Column('varchar')
    region: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    phone: string;

    @OneToMany(() => ProfileAttributeEntity, (attribute) => attribute.profile, {
        cascade: ['insert'],
    })
    attributes: ProfileAttributeEntity[];

    @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;
}
