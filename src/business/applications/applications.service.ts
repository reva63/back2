import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Application } from './entities/application.entity';
import { GetApplicationsParamsDto } from './dto/get/getApplications.params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetApplicationByIdParamsDto } from './dto/get/getApplicationById.params.dto';
import { CreateApplicationParamsDto } from './dto/create/createApplication.params.dto';
import { CreateApplicationBodyDto } from './dto/create/createApplication.body.dto';
import { UpdateApplicationParamsDto } from './dto/update/updateApplication.params.dto';
import { UpdateApplicationBodyDto } from './dto/update/updateApplication.body.dto';
import { DeleteApplicationParamsDto } from './dto/delete/deleteApplication.params.dto';
import { ServiceInterface } from 'src/core/abstract/base/applications/service.interface';

@Injectable()
export class ApplicationsService implements ServiceInterface<Application> {
    constructor(
        @InjectRepository(Application)
        private readonly applicationsRepository: Repository<Application>,
    ) {}

    async list(params: GetApplicationsParamsDto): Promise<Application[]> {
        return await this.applicationsRepository.find();
    }

    async show(params: GetApplicationByIdParamsDto): Promise<Application> {
        const application = await this.applicationsRepository.findOneBy({
            id: params.id,
        });
        if (!application) {
            throw new NotFoundException();
        }
        return application;
    }

    async store(
        params: CreateApplicationParamsDto,
        body: CreateApplicationBodyDto,
    ): Promise<Application> {
        const { contestId, userId, ...data } = body;
        const application = this.applicationsRepository.create({
            ...data,
            contest: { id: contestId },
            user: { id: userId },
        });
        return await this.applicationsRepository.save(application).catch(() => {
            throw new BadRequestException();
        });
    }

    async update(
        params: UpdateApplicationParamsDto,
        body: UpdateApplicationBodyDto,
    ): Promise<boolean> {
        return Boolean(
            await this.applicationsRepository
                .update({ id: params.id }, body)
                .catch((error) => {
                    console.error(error);
                    throw new BadRequestException();
                }),
        );
    }

    async remove(params: DeleteApplicationParamsDto): Promise<boolean> {
        const application = await this.applicationsRepository.findOneBy({
            id: params.id,
        });
        if (!application) {
            throw new NotFoundException();
        }
        return Boolean(await this.applicationsRepository.remove(application));
    }
}
