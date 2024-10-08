import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';

@Module({ imports: [TypeOrmModule.forFeature([CategoryEntity])], providers: [CategoriesService], controllers: [CategoriesController] })
export class CategoriesModule {}
