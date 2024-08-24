import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/users/entity.interface';
import { UserRoles } from '../types/user-roles.enum';

@Entity('user')
export class User implements EntityInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'enum', enum: UserRoles })
    role: UserRoles;
}
