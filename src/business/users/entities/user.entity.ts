import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/entity.interface';
import { UserRoles } from '../types/user-roles.enum';

@Entity('User')
export class User implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'enum', enum: UserRoles })
    role: UserRoles;
}
