import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/business/users/entities/user.entity';
import { EntityInterface } from 'src/core/abstract/base/auth/entity.interface';

@Entity('AuthSessions')
export class AuthSessions implements EntityInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    device_id: string;

    @Column({ type: 'int' })
    issued_at: number;

    @Column({ type: 'varchar', length: 255 })
    ip: string;

    @Column({ type: 'varchar', length: 255 })
    device_name: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @Index('idx_session_user_id')
    user: User;
}
