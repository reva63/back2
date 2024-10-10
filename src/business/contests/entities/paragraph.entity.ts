import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContestEntity } from './contest.entity';

@Entity()
export class Paragraph {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    order: number;

    @Column('jsonb')
    data: object;

    @ManyToOne(() => ContestEntity, (contest) => contest.paragraphs, {
        onDelete: 'CASCADE',
    })
    contest: ContestEntity;
}
