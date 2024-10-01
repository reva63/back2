import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBirthCity } from '../types/userBirthCity.enum';

@Entity('user_attribute')
export class UserMetaAttributeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    passport_number: string;

    @Column({ type: 'date', nullable: true })
    birth_day: Date;

    @Column({ type: 'enum', enum: UserBirthCity, nullable: true })
    birth_city: UserBirthCity;
}
