import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { ContestsController } from './contests.controller';
import { ContestsService } from './contests.service';
import { ContestStage } from './entities/contestStage.entity';
import { ContestRegion } from './entities/contestRegion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Contest, ContestStage, ContestRegion])],
    controllers: [ContestsController],
    providers: [ContestsService],
    exports: [ContestsService],
})
export class ContestsModule {}
