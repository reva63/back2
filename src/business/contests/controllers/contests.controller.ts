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
import { GetContestsParamsDto } from '../dto/get/getContests.params.dto';
import { GetContestByIdParamsDto } from '../dto/get/getContestById.params.dto';
import { CreateContestParamsDto } from '../dto/create/createContest.params.dto';
import { CreateContestBodyDto } from '../dto/create/createContest.body.dto';
import { UpdateContestParamsDto } from '../dto/update/updateContest.params.dto';
import { UpdateContestBodyDto } from '../dto/update/updateContest.body.dto';
import { DeleteContestParamsDto } from '../dto/delete/deleteContest.params.dto';

@Controller('/contests')
export class ContestsController {
    constructor(private contestsService: ContestsService) {}

    @Get()
    async list(
        @Param() params: GetContestsParamsDto,
    ): Promise<ContestEntity[]> {
        return await this.contestsService.list({ params });
    }

    @Get('/:id')
    async show(
        @Param() params: GetContestByIdParamsDto,
    ): Promise<ContestEntity> {
        return await this.contestsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: CreateContestParamsDto,
        @Body() body: CreateContestBodyDto,
    ): Promise<void | ContestEntity> {
        return this.contestsService.store({ params, body });
    }

    @Patch('/:id')
    async update(
        @Param() params: UpdateContestParamsDto,
        @Body() body: UpdateContestBodyDto,
    ): Promise<void> {
        await this.contestsService.update({ params, body });
    }

    @Delete('/:id')
    async remove(@Param() params: DeleteContestParamsDto): Promise<void> {
        await this.contestsService.remove({ params });
    }
}
