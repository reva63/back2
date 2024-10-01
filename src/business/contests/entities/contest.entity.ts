import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContestStage } from './contestStage.entity';
import { ContestRegionEntity } from './contestRegion.entity';
import { Application } from 'src/business/applications/entities/application.entity';

@Entity()
export class Contest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    areViewersAllowed: boolean;

    @Column()
    isOnline: boolean;

    @OneToMany(() => ContestRegionEntity, (region) => region.contest)
    regions: ContestRegionEntity[];

    @OneToMany(() => Application, (application) => application.contest)
    applications: Application[];

    @OneToMany(() => ContestStage, (stage) => stage.contest, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    stages: ContestStage[];
}
