import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SocialTypes } from 'src/core/types/socialTypes.enum';

@Entity()
export class SocialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', { enum: SocialTypes, nullable: true })
    platform: SocialTypes | null;

    @Column('varchar', { nullable: true })
    url: string | null;

    @ManyToOne(() => UserEntity, (user) => user.socials)
    user: UserEntity;
}
