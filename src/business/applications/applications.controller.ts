import { Controller } from '@nestjs/common';
import { ControllerInterface } from 'src/core/abstract/base/controller.interface';
import { Application } from './entities/application.entity';
import { ApplicationsService } from './applications.service';
import { DeleteApplicationParamsDto } from './dto/delete/deleteApplication.params.dto';
import { UpdateApplicationBodyDto } from './dto/update/updateApplication.body.dto';
import { UpdateApplicationParamsDto } from './dto/update/updateApplication.params.dto';
import { CreateApplicationBodyDto } from './dto/create/createApplication.body.dto';
import { CreateApplicationParamsDto } from './dto/create/createApplication.params.dto';
import { GetApplicationByIdParamsDto } from './dto/get/getApplicationById.params.dto';
import { GetApplicationsParamsDto } from './dto/get/getApplications.params.dto';

@Controller()
export class ApplicationsController
    implements ControllerInterface<Application>
{
    constructor(private applicationsService: ApplicationsService) {}

    async list(params: GetApplicationsParamsDto): Promise<Application[]> {
        return await this.applicationsService.list(params);
    }

    async show(params: GetApplicationByIdParamsDto): Promise<Application> {
        return await this.applicationsService.show(params);
    }

    // needs for user assignment
    async store(
        params: CreateApplicationParamsDto,
        body: CreateApplicationBodyDto,
    ): Promise<Application> {
        return await this.applicationsService.store(params, body);
    }

    async update(
        params: UpdateApplicationParamsDto,
        body: UpdateApplicationBodyDto,
    ): Promise<void> {
        await this.applicationsService.update(params, body);
    }

    async remove(params: DeleteApplicationParamsDto): Promise<void> {
        await this.applicationsService.remove(params);
    }
}
