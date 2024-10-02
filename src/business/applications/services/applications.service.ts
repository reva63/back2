import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

@Injectable()
export class ApplicationsService implements IService<ApplicationEntity> {
    constructor(
        @InjectRepository(ApplicationEntity)
        private readonly applicationsRepository: Repository<ApplicationEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ApplicationEntity[]> {
        return await this.applicationsRepository.find();
    }
}
