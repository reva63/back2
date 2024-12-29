import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { DirectionsService } from '../directions/services/directions.service';
import { DirectionEntity } from '../directions/entities/direction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, DirectionEntity])],
    providers: [CategoriesService, DirectionsService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
