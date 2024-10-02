import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RightEntity } from './right.entity';

@Entity()
export class RoleEnity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];

    @ManyToMany(() => RightEntity, (right) => right.roles)
    rights: RightEntity[];
}
