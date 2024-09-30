import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { Application } from './entities/application.entity';
import { ApplicationsService } from './applications.service';
import { DeleteApplicationParamsDto } from './dto/delete/deleteApplication.params.dto';
import { UpdateApplicationBodyDto } from './dto/update/updateApplication.body.dto';
import { UpdateApplicationParamsDto } from './dto/update/updateApplication.params.dto';
import { CreateApplicationBodyDto } from './dto/create/createApplication.body.dto';
import { CreateApplicationParamsDto } from './dto/create/createApplication.params.dto';
import { GetApplicationByIdParamsDto } from './dto/get/getApplicationById.params.dto';
import { GetApplicationsParamsDto } from './dto/get/getApplications.params.dto';
import { ControllerInterface } from 'src/core/abstract/base/applications/controller.interface';

@Controller('/applications')
export class ApplicationsController
    implements ControllerInterface<Application>
{
    constructor(private applicationsService: ApplicationsService) {}

    @Get()
    async list(
        @Param() params: GetApplicationsParamsDto,
    ): Promise<Application[]> {
        return await this.applicationsService.list(params);
    }

    @Get('/:id')
    async show(
        @Param() params: GetApplicationByIdParamsDto,
    ): Promise<Application> {
        return await this.applicationsService.show(params);
    }

    @Post()
    async store(
        @Param() params: CreateApplicationParamsDto,
        @Body() body: CreateApplicationBodyDto,
    ): Promise<Application> {
        return await this.applicationsService.store(params, body);
    }

    @Patch('/:id')
    async update(
        @Param() params: UpdateApplicationParamsDto,
        @Body() body: UpdateApplicationBodyDto,
    ): Promise<void> {
        console.dir(body);
        await this.applicationsService.update(params, body);
    }

    @Delete('/:id')
    async remove(@Param() params: DeleteApplicationParamsDto): Promise<void> {
        await this.applicationsService.remove(params);
    }
}
