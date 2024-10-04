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
import { ListRatingsParamsDto } from '../dto/list/listRatings.params.dto';
import { RatingEntity } from '../entities/rating.entity';
import { ShowRatingParamsDto } from '../dto/show/showRating.params.dto';
import { StoreRatingParamsDto } from '../dto/store/storeRating.params.dto';
import { StoreRatingBodyDto } from '../dto/store/storeRating.body.dto';
import { UpdateRatingParamsDto } from '../dto/update/updateRating.params.dto';
import { UpdateRatingBodyDto } from '../dto/update/updateRating.body.dto';
import { RemoveRatingParamsDto } from '../dto/remove/removeRating.params.dto';

@Controller('/ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get()
    async list(@Param() params: ListRatingsParamsDto): Promise<RatingEntity[]> {
        return await this.ratingsService.list({ params });
    }

    @Get('/:rating')
    async show(@Param() params: ShowRatingParamsDto): Promise<RatingEntity> {
        return await this.ratingsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreRatingParamsDto,
        @Body() body: StoreRatingBodyDto,
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
    async remove(@Param() params: RemoveRatingParamsDto): Promise<void> {
        await this.ratingsService.remove({ params });
    }
}
