import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { ContestEntity } from '../entities/contest.entity';

@Injectable()
export class ContestsService implements IService<ContestEntity> {
    constructor(
        @InjectRepository(ContestEntity)
        private contestsRepository: Repository<ContestEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ContestEntity[]> {
        return await this.contestsRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ContestEntity> {
        const contest = await this.contestsRepository.findOneBy({
            id: options.params.post,
        });
        if (!contest) {
            throw new NotFoundException();
        }
        return contest;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<any> {
        const creatable = {} as DeepPartial<ContestEntity>;
        return await this.contestsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {} as DeepPartial<ContestEntity>;
        return Boolean(
            await this.contestsRepository.update(
                { id: options.params.contest },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const constest = await this.contestsRepository.findOneBy({
            id: options.params.contest,
        });
        if (!constest) {
            throw new NotFoundException();
        }
        return Boolean(await this.contestsRepository.remove(constest));
    }
}
