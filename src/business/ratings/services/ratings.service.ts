import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { RatingEntity } from '../entities/rating.entity';

export class RatingsService implements IService<RatingEntity> {
    constructor(
        @InjectRepository(RatingEntity)
        private readonly ratingsRepository: Repository<RatingEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<RatingEntity[]> {
        return await this.ratingsRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<RatingEntity> {
        return await this.ratingsRepository.findOneBy({
            id: options.params.rating,
        });
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<RatingEntity> {
        const creatable = {} as DeepPartial<RatingEntity>;
        return await this.ratingsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {} as DeepPartial<RatingEntity>;
        return Boolean(
            await this.ratingsRepository.update(
                { id: options.params.rating },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const rating = await this.ratingsRepository.findOneBy({
            id: options.params.rating,
        });
        if (!rating) {
            throw new NotFoundException();
        }
        return Boolean(await this.ratingsRepository.remove(rating));
    }
}
