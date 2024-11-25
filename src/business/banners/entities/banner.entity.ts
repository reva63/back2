import { UserEntity } from 'src/business/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BannerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    header: string;

    @Column('varchar')
    text: string;

    @Column('varchar')
    buttonText: string;

    @Column('varchar')
    buttonUrl: string;

    @ManyToOne(() => UserEntity, (user) => user.banners, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;
}
