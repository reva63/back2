import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    UseInterceptors,
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
import {
    FileInterceptor,
    MemoryStorageFile,
    UploadedFile,
} from '@blazity/nest-file-fastify';

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
    @UseInterceptors(FileInterceptor('template'))
    async store(
        @Param() params: StoreStageParamsDto,
        @Body() body: StoreStageBodyDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [new FileTypeValidator({ fileType: /(jpg|png)$/ })],
            }),
        )
        template: MemoryStorageFile,
    ): Promise<void | StageEntity> {
        body.certificateTemplate = template.buffer;
        return this.stagesService.store({ params, body });
    }

    @Patch('/:stage')
    async update(
        @Param() params: UpdateStageParamsDto,
        @Body() body: UpdateStageBodyDto,
    ): Promise<StageEntity> {
        return await this.stagesService.update({ params, body });
    }

    @Delete('/:stage')
    async remove(@Param() params: RemoveStageParamsDto): Promise<void> {
        await this.stagesService.remove({ params });
    }
}
