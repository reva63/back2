import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/entity.interface';
import { UserRoles } from '../types/user-roles.enum';
import { Application } from 'src/business/applications/entities/application.entity';

@Entity()
export class User implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: UserRoles;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];
}
