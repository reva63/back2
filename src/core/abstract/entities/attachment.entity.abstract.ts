import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class AttachmentEntityAbstract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    key: string;

    @Column('varchar')
    link: string;

    @Column('varchar')
    originalName: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date | null;
}
