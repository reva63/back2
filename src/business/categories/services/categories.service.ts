import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class CategoriesService implements IService<CategoryEntity>{
    constructor(
        @InjectRepository(CategoryEntity)
        private categoriesRepository: Repository<CategoryEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<CategoryEntity[]> {
        return await this.categoriesRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<CategoryEntity> {
        const category = await this.categoriesRepository.findOneBy({
            id: options.params.category,
        });
        if (!category) {
            throw new NotFoundException();
        }
        return category;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<CategoryEntity> {
        const creatable = {
            title: options.body.title,
            direction: options.body.direction,
        } as DeepPartial<CategoryEntity>;
        return await this.categoriesRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {
            title: options.body.title,
            direction: options.body.direction,
        } as DeepPartial<CategoryEntity>;
        return Boolean(
            await this.categoriesRepository.update(
                { id: options.params.category },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const category = await this.categoriesRepository.findOneBy({
            id: options.params.category,
        });
        if (!category) {
            throw new NotFoundException();
        }
        return Boolean(await this.categoriesRepository.remove(category));
    }
}
