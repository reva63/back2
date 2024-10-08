import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ListCategoriesParamsDto } from '../dto/list/listCategories.params.dto';
import { RemoveCategoryParamsDto } from '../dto/remove/removeCategory.params.dto';
import { ShowCategoryParamsDto } from '../dto/show/ShowCategory.params.dto';
import { StoreCategoryBodyDto } from '../dto/store/storeCategory.body.dto';
import { StoreCategoryParamsDto } from '../dto/store/storeCategory.params.dto';
import { UpdateCategoryBodyDto } from '../dto/update/updateCategory.body.dto';
import { UpdateCategoryParamsDto } from '../dto/update/updateCategory.params.dto';
import { CategoryEntity } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('/categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    async list(
        @Param() params: ListCategoriesParamsDto,
    ): Promise<CategoryEntity[]> {
        return await this.categoriesService.list({ params });
    }

    @Get('/:category')
    async show(
        @Param() params: ShowCategoryParamsDto,
    ): Promise<CategoryEntity> {
        return this.categoriesService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreCategoryParamsDto,
        @Body() body: StoreCategoryBodyDto,
    ): Promise<void | CategoryEntity> {
        return this.categoriesService.store({ params, body });
    }

    @Patch('/:category')
    async update(
        @Param() params: UpdateCategoryParamsDto,
        @Body() body: UpdateCategoryBodyDto,
    ): Promise<void> {
        await this.categoriesService.update({ params, body });
    }

    @Delete('/:category')
    async remove(@Param() params: RemoveCategoryParamsDto): Promise<void> {
        await this.categoriesService.remove({ params });
    }
}
