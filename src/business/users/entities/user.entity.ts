import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/users/entity.interface';
import { UserRoles } from '../types/user-roles.enum';
import { Application } from 'src/business/applications/entities/application.entity';

@Entity('user')
export class User implements EntityInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'enum', enum: UserRoles })
    role: UserRoles;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];
}
