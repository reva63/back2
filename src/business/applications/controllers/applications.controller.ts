import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApplicationsService } from '../services/applications.service';
import { ListApplicationsParamsDto } from '../dto/list/listApplications.params.dto';
import { StoreApplicationParamsDto } from '../dto/store/storeApplication.params.dto';
import { StoreApplicationBodyDto } from '../dto/store/storeApplication.body.dto';
import { ShowApplicationParamsDto } from '../dto/show/showApplication.params.dto';
import { UpdateApplicationBodyDto } from '../dto/update/updateApplication.body.dto';
import { UpdateApplicationParamsDto } from '../dto/update/updateApplication.params.dto';
import { RemoveApplicationParamsDto } from '../dto/remove/removeApplication.params.dto';

@Controller('/applications')
export class ApplicationsController {
    constructor(private applicationsService: ApplicationsService) {}

    @Get()
    async list(@Param() params: ListApplicationsParamsDto) {
        return await this.applicationsService.list({ params });
    }

    @Get('/:application')
    async show(@Param() params: ShowApplicationParamsDto) {
        return await this.applicationsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreApplicationParamsDto,
        @Body() body: StoreApplicationBodyDto,
    ) {
        return await this.applicationsService.store({ params, body });
    }

    @Patch('/:application')
    async update(
        @Param() params: UpdateApplicationParamsDto,
        @Body() body: UpdateApplicationBodyDto,
    ) {
        return await this.applicationsService.update({ params, body });
    }

    @Delete('/:application')
    async remove(@Param() params: RemoveApplicationParamsDto) {
        return await this.applicationsService.remove({ params });
    }
}
