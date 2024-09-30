import { ServiceInterface } from 'src/core/abstract/base/ratings/service.interface';
import { Rating } from './entities/rating.entity';
import { GetRatingsParamsDto } from './dto/get/getRatings.params.dto';
import { GetRatingByIdParamsDto } from './dto/get/getRatingById.params.dto';
import { UpdateRatingParamsDto } from './dto/update/updateRating.params.dto';
import { UpdateRatingBodyDto } from './dto/update/updateRating.body.dto';
import { DeleteRatingParamsDto } from './dto/delete/deleteRating.params.dto';
import { CreateRatingParamsDto } from './dto/create/createRating.params.dto';
import { CreateRatingBodyDto } from './dto/create/createRating.body.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class RatingsService implements ServiceInterface<Rating> {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingsRepository: Repository<Rating>,
    ) {}
    async list(params: GetRatingsParamsDto): Promise<Rating[]> {
        return await this.ratingsRepository.find();
    }
    async show(params: GetRatingByIdParamsDto): Promise<Rating> {
        const rating = await this.ratingsRepository.findOneBy({
            id: params.id,
        });
        if (!rating) {
            throw new NotFoundException();
        }

        return rating;
    }

    async store(
        params: CreateRatingParamsDto,
        body: CreateRatingBodyDto,
    ): Promise<Rating> {
        const rating = this.ratingsRepository.create(body);
        return await this.ratingsRepository.save(rating);
    }

    async update(
        params: UpdateRatingParamsDto,
        body: UpdateRatingBodyDto,
    ): Promise<boolean> {
        return Boolean(
            await this.ratingsRepository
                .update({ id: params.id }, body)
                .catch((error) => {
                    console.error(error);
                    throw new BadRequestException();
                }),
        );
    }

    async remove(params: DeleteRatingParamsDto): Promise<boolean> {
        const rating = await this.ratingsRepository.findOneBy({
            id: params.id,
        });
        if (!rating) {
            throw new NotFoundException();
        }
        return Boolean(await this.ratingsRepository.remove(rating));
    }
}
