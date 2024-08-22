import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContestStage } from './contestStage.entity';
import { ContestRegion } from './contestRegion.entity';

@Entity()
export class Contest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    areViewersAllowed: boolean;

    @Column()
    isOnline: boolean;

    @OneToMany(() => ContestRegion, (region) => region.contest)
    regions: ContestRegion[];

    @OneToMany(() => ContestStage, (stage) => stage.contest, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    stages: ContestStage[];
}
