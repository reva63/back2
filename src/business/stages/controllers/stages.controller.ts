import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { StagesService } from '../services/stages.service';
import { GetStagesParamsDto } from '../dto/get/getStages.params.dto';
import { GetStageByIdParamsDto } from '../dto/get/getStageById.params.dto';
import { StageEntity } from '../entities/stage.entity';
import { CreateStageParamsDto } from '../dto/create/createStage.params.dto';
import { CreateStageBodyDto } from '../dto/create/createStage.body.dto';
import { UpdateStageParamsDto } from '../dto/update/updateStage.params.dto';
import { UpdateStageBodyDto } from '../dto/update/updateStage.body.dto';
import { DeleteStageParamsDto } from '../dto/delete/deleteStage.params.dto';

@Controller('/stages')
export class StagesController {
    constructor(private stagesService: StagesService) {}

    @Get()
    async list(@Param() params: GetStagesParamsDto): Promise<StageEntity[]> {
        return await this.stagesService.list({ params });
    }

    @Get('/:stage')
    async show(@Param() params: GetStageByIdParamsDto): Promise<StageEntity> {
        return this.stagesService.show({ params });
    }

    @Post()
    async store(
        @Param() params: CreateStageParamsDto,
        @Body() body: CreateStageBodyDto,
    ): Promise<void | StageEntity> {
        return this.stagesService.store({ params, body });
    }

    @Patch('/:stage')
    async update(
        @Param() params: UpdateStageParamsDto,
        @Body() body: UpdateStageBodyDto,
    ): Promise<void> {
        await this.stagesService.update({ params, body });
    }

    @Delete('/:stage')
    async remove(@Param() params: DeleteStageParamsDto): Promise<void> {
        await this.stagesService.remove({ params });
    }
}
