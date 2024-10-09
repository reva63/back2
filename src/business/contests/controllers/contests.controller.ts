import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ContestEntity } from '../entities/contest.entity';
import { ContestsService } from '../services/contests.service';
import { ListContestsParamsDto } from '../dto/list/listContests.params.dto';
import { ShowContestParamsDto } from '../dto/show/showContest.params.dto';
import { UpdateContestParamsDto } from '../dto/update/updateContest.params.dto';
import { UpdateContestBodyDto } from '../dto/update/updateContest.body.dto';
import { RemoveContestParamsDto } from '../dto/remove/removeContest.params.dto';
import { StoreContestBodyDto } from '../dto/store/storeContest.body.dto';
import { StoreContestParamsDto } from '../dto/store/storeContest.params.dto';

@Controller('/contests')
export class ContestsController {
    constructor(private readonly contestsService: ContestsService) {}

    @Get()
    async list(
        @Param() params: ListContestsParamsDto,
    ): Promise<ContestEntity[]> {
        return await this.contestsService.list({ params });
    }

    @Get('/:contest')
    async show(@Param() params: ShowContestParamsDto): Promise<ContestEntity> {
        return await this.contestsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreContestParamsDto,
        @Body() body: StoreContestBodyDto,
    ): Promise<void | ContestEntity> {
        return this.contestsService.store({ params, body });
    }

    @Patch('/:contest')
    async update(
        @Param() params: UpdateContestParamsDto,
        @Body() body: UpdateContestBodyDto,
    ): Promise<void> {
        await this.contestsService.update({ params, body });
    }

    @Delete('/:contest')
    async remove(@Param() params: RemoveContestParamsDto): Promise<void> {
        await this.contestsService.remove({ params });
    }
}
