import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestEntity } from './entities/contest.entity';
import { ContestAttributeEntity } from './entities/contestAttribute.entity';
import { ContestsController } from './controllers/contests.controller';
import { ContestsService } from './services/contests.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContestEntity, ContestAttributeEntity]),
    ],
    controllers: [ContestsController],
    providers: [ContestsService],
    exports: [ContestsService],
})
export class ContestsModule {}
