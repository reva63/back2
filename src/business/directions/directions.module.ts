import { Module } from '@nestjs/common';
import { DirectionsController } from './controllers/directions.controller';
import { DirectionsService } from './services/directions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from './entities/direction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DirectionEntity])],
    controllers: [DirectionsController],
    providers: [DirectionsService],
})
export class DirectionsModule {}
