import { EntityInterface } from 'src/core/abstract/base/users/entity.interface';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../types/userRoles.enum';
import { User } from './user.entity';

@Entity()
export class Role implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: UserRoles, unique: true })
    role: UserRoles;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
