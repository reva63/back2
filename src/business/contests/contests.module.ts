import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestEntity } from './entities/contest.entity';
import { ContestAttributeEntity } from './entities/contestAttribute.entity';
import { ContestsController } from './controllers/contests.controller';
import { ContestsService } from './services/contests.service';
import { ParagraphEntity } from './entities/paragraph.entity';
import { ParagraphsService } from './services/paragraphs.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ContestEntity,
            ContestAttributeEntity,
            ParagraphEntity,
        ]),
    ],
    controllers: [ContestsController],
    providers: [ContestsService, ParagraphsService],
    exports: [ContestsService],
})
export class ContestsModule {}
