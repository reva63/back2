import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PassportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true })
    series: string | null;

    @Column('varchar', { nullable: true })
    number: string | null;

    @Column('text', { nullable: true })
    issuedBy: string | null;

    @Column('date', { nullable: true })
    issueDate: Date;

    @Column('text', { nullable: true })
    mainPage: string | null;

    @Column('text', { nullable: true })
    residencePage: string | null;

    @OneToOne(() => UserEntity, (user) => user.passport)
    @JoinColumn()
    user: UserEntity;
}
