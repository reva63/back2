import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEntity } from './entities/stage.entity';

@Module({ imports: [TypeOrmModule.forFeature([StageEntity])] })
export class StagesModule {}
