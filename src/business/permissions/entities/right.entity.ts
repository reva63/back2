import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnity } from './role.entity';

@Entity()
export class RightEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @ManyToMany(() => UserEntity, (user) => user.rights)
    users: UserEntity[];

    @ManyToMany(() => RoleEnity, (role) => role.rights)
    roles: RoleEnity[];
}
