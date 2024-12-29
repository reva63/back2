import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class TokenEntity {
    @Column('varchar')
    refreshToken: string;

    @PrimaryColumn()
    userId: number;

    @OneToOne(() => UserEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserEntity;
}
