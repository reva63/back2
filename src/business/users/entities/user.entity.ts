import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from 'src/core/abstract/base/entity.interface';
import { UserRoles } from '../enums/user-roles.enum';

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
}
