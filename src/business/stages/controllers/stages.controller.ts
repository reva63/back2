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
import { ListStagesParamsDto } from '../dto/list/listStages.params.dto';
import { ShowStageParamsDto } from '../dto/show/showStage.params.dto';
import { StageEntity } from '../entities/stage.entity';
import { StoreStageParamsDto } from '../dto/store/storeStage.params.dto';
import { StoreStageBodyDto } from '../dto/store/storeStage.body.dto';
import { UpdateStageParamsDto } from '../dto/update/updateStage.params.dto';
import { UpdateStageBodyDto } from '../dto/update/updateStage.body.dto';
import { RemoveStageParamsDto } from '../dto/remove/removeStage.params.dto';

@Controller('/stages')
export class StagesController {
    constructor(private stagesService: StagesService) {}

    @Get()
    async list(@Param() params: ListStagesParamsDto): Promise<StageEntity[]> {
        return await this.stagesService.list({ params });
    }

    @Get('/:stage')
    async show(@Param() params: ShowStageParamsDto): Promise<StageEntity> {
        return this.stagesService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreStageParamsDto,
        @Body() body: StoreStageBodyDto,
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
    async remove(@Param() params: RemoveStageParamsDto): Promise<void> {
        await this.stagesService.remove({ params });
    }
}
