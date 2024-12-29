import { UserEntity } from 'src/business/users/entities/user.entity';
import { CitizenshipTypes } from 'src/core/types/citizenshipTypes.enum';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true })
    firstName: string;

    @Column('varchar', { nullable: true })
    lastName: string;

    @Column('varchar', { nullable: true })
    middleName: string | null;

    @Column('simple-enum', { enum: ['male', 'female'], nullable: true })
    gender: 'male' | 'female';

    @Column('date', { nullable: true })
    dateOfBirth: Date;

    @Column('enum', { enum: CitizenshipTypes, nullable: true })
    citizenship: CitizenshipTypes;

    @Column('text', { nullable: true })
    avatarUrl: string | null;

    @Column('text', { nullable: true })
    portfolio: string | null;

    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn()
    user: UserEntity;
}
