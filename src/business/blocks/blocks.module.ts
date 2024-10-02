import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './entities/block.entity';

@Module({ imports: [TypeOrmModule.forFeature([BlockEntity])] })
export class BlocksModule {}
