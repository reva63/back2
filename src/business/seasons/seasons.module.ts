import { Module } from '@nestjs/common';
import { SeasonsService } from './services/seasons.service';
import { SeasonsController } from './controllers/seasons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonEntity } from './entities/season.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SeasonEntity])],
    providers: [SeasonsService],
    controllers: [SeasonsController],
})
export class SeasonsModule {}
