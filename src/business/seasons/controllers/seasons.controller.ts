import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { SeasonEntity } from '../entities/season.entity';
import { SeasonsService } from '../services/seasons.service';
import { ListSeasonsParamsDto } from '../dto/list/listSeasons.params.dto';
import { RemoveSeasonParamsDto } from '../dto/remove/removeSeason.params.dto';
import { ShowSeasonParamsDto } from '../dto/show/showSeason.params.dto';
import { StoreSeasonBodyDto } from '../dto/store/storeSeason.body.dto';
import { StoreSeasonParamsDto } from '../dto/store/storeSeason.params.dto';
import { UpdateSeasonBodyDto } from '../dto/update/updateSeason.body.dto';
import { UpdateSeasonParamsDto } from '../dto/update/updateSeason.params.dto';

@Controller('seasons')
export class SeasonsController {
    constructor(private seasonsService: SeasonsService) {}

    @Get()
    async list(@Param() params: ListSeasonsParamsDto): Promise<SeasonEntity[]> {
        return await this.seasonsService.list({ params });
    }

    @Get('/:season')
    async show(@Param() params: ShowSeasonParamsDto): Promise<SeasonEntity> {
        return this.seasonsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreSeasonParamsDto,
        @Body() body: StoreSeasonBodyDto,
    ): Promise<void | SeasonEntity> {
        return this.seasonsService.store({ params, body });
    }

    @Patch('/:season')
    async update(
        @Param() params: UpdateSeasonParamsDto,
        @Body() body: UpdateSeasonBodyDto,
    ): Promise<SeasonEntity> {
        return await this.seasonsService.update({ params, body });
    }

    @Delete('/:season')
    async remove(@Param() params: RemoveSeasonParamsDto): Promise<void> {
        await this.seasonsService.remove({ params });
    }
}
