import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { RatingsController } from './controllers/ratings.controller';
import { RatingsService } from './services/ratings.service';

@Module({
    imports: [TypeOrmModule.forFeature([RatingEntity])],
    controllers: [RatingsController],
    providers: [RatingsService],
    exports: [RatingsService],
})
export class RatingsModule {}
