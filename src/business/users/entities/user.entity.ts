import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from 'src/business/applications/entities/application.entity';
import { Role } from './role.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];

    @ManyToMany(() => Role, (role) => role.users, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    roles: Role[];
}
