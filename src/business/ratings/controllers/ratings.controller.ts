import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { RatingsService } from '../services/ratings.service';
import { GetRatingsParamsDto } from '../dto/get/getRatings.params.dto';
import { RatingEntity } from '../entities/rating.entity';
import { GetRatingByIdParamsDto } from '../dto/get/getRatingById.params.dto';
import { CreateRatingParamsDto } from '../dto/create/createRating.params.dto';
import { CreateRatingBodyDto } from '../dto/create/createRating.body.dto';
import { UpdateRatingParamsDto } from '../dto/update/updateRating.params.dto';
import { UpdateRatingBodyDto } from '../dto/update/updateRating.body.dto';
import { DeleteRatingParamsDto } from '../dto/delete/deleteRating.params.dto';

@Controller('/ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get()
    async list(@Param() params: GetRatingsParamsDto): Promise<RatingEntity[]> {
        return await this.ratingsService.list({ params });
    }

    @Get('/:rating')
    async show(@Param() params: GetRatingByIdParamsDto): Promise<RatingEntity> {
        return await this.ratingsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: CreateRatingParamsDto,
        @Body() body: CreateRatingBodyDto,
    ): Promise<RatingEntity> {
        return await this.store(params, body);
    }

    @Patch('/:rating')
    async update(
        @Param() params: UpdateRatingParamsDto,
        @Body() body: UpdateRatingBodyDto,
    ): Promise<void> {
        await this.ratingsService.update({ params, body });
    }

    @Delete('/:rating')
    async remove(@Param() params: DeleteRatingParamsDto): Promise<void> {
        await this.ratingsService.remove({ params });
    }
}
