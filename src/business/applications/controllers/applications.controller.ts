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
import { GetApplicationsParamsDto } from '../dto/get/getApplications.params.dto';
import { CreateApplicationParamsDto } from '../dto/create/createApplication.params.dto';
import { CreateApplicationBodyDto } from '../dto/create/createApplication.body.dto';
import { GetApplicationByIdParamsDto } from '../dto/get/getApplicationById.params.dto';
import { UpdateApplicationBodyDto } from '../dto/update/updateApplication.body.dto';
import { UpdateApplicationParamsDto } from '../dto/update/updateApplication.params.dto';
import { DeleteApplicationParamsDto } from '../dto/delete/deleteApplication.params.dto';

@Controller('/applications')
export class ApplicationsController {
    constructor(private applicationsService: ApplicationsService) {}

    @Get()
    async list(@Param() params: GetApplicationsParamsDto) {
        return await this.applicationsService.list({ params });
    }

    @Get('/:application')
    async show(@Param() params: GetApplicationByIdParamsDto) {}

    @Post()
    async store(
        @Param() params: CreateApplicationParamsDto,
        @Body() body: CreateApplicationBodyDto,
    ) {}

    @Patch('/:application')
    async update(
        @Param() params: UpdateApplicationParamsDto,
        @Body() body: UpdateApplicationBodyDto,
    ) {}

    @Delete('/:application')
    async remove(@Param() params: DeleteApplicationParamsDto) {}
}
