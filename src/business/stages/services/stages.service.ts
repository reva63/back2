import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { StageEntity } from '../entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

@Injectable()
export class StagesService implements IService<StageEntity> {
    constructor(
        @InjectRepository(StageEntity)
        private stagesRepository: Repository<StageEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<StageEntity[]> {
        return await this.stagesRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<StageEntity> {
        const stage = await this.stagesRepository.findOneBy({
            id: options.params.stage,
        });
        if (!stage) {
            throw new NotFoundException();
        }
        return stage;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<StageEntity> {
        const creatable = {
            title: options.body.title,
            startDate: options.body.startDate,
            endDate: options.body.endDate,
            contest: options.body.contest,
            certificates: options.body.certificates,
        } as DeepPartial<StageEntity>;
        return await this.stagesRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean | StageEntity | StageEntity[]> {
        const creatable = {
            title: options.body.title,
            startDate: options.body.startDate,
            endDate: options.body.endDate,
            contest: options.body.contest,
            certificates: options.body.certificates,
        } as DeepPartial<StageEntity>;
        return Boolean(
            await this.stagesRepository.update(
                { id: options.params.stage },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean | StageEntity> {
        const stage = await this.stagesRepository.findOneBy({
            id: options.params.stage,
        });
        if (!stage) {
            throw new NotFoundException();
        }
        return Boolean(await this.stagesRepository.remove(stage));
    }
}
