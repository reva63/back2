import { Controller } from '@nestjs/common';
import { ControllerInterface } from 'src/core/abstract/base/ratings/controller.interface';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';
import { DeleteRatingParamsDto } from './dto/delete/deleteRating.params.dto';
import { UpdateRatingParamsDto } from './dto/update/updateRating.params.dto';
import { UpdateRatingBodyDto } from './dto/update/updateRating.body.dto';
import { CreateRatingBodyDto } from './dto/create/createRating.body.dto';
import { CreateRatingParamsDto } from './dto/create/createRating.params.dto';
import { GetRatingByIdParamsDto } from './dto/get/getRatingById.params.dto';
import { GetRatingsParamsDto } from './dto/get/getRatings.params.dto';

@Controller('ratings')
export class RatingsController implements ControllerInterface<Rating> {
    constructor(private readonly ratingsService: RatingsService) {}

    async list(params: GetRatingsParamsDto): Promise<Rating[]> {
        return await this.list(params);
    }

    async show(params: GetRatingByIdParamsDto): Promise<Rating> {
        return await this.show(params);
    }

    async store(
        params: CreateRatingParamsDto,
        body: CreateRatingBodyDto,
    ): Promise<void | Rating> {
        return await this.store(params, body);
    }

    async update(
        params: UpdateRatingParamsDto,
        body: UpdateRatingBodyDto,
    ): Promise<void> {
        await this.ratingsService.update(params, body);
    }

    async remove(params: DeleteRatingParamsDto): Promise<void> {
        await this.remove(params);
    }
}
