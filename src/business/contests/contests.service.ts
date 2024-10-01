import { Injectable, NotFoundException } from '@nestjs/common';
import { Contest } from './entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

@Injectable()
export class ContestsService implements IService<Contest> {
    constructor(
        @InjectRepository(Contest)
        private contestRepository: Repository<Contest>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<Contest[]> {
        return await this.contestRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<Contest> {
        const contest = await this.contestRepository.findOneBy({
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
        const creatable = {} as DeepPartial<Contest>;
        return await this.contestRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {} as DeepPartial<Contest>;
        return Boolean(
            await this.contestRepository.update(
                { id: options.params.contest },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const constest = await this.contestRepository.findOneBy({
            id: options.params.contest,
        });
        if (!constest) {
            throw new NotFoundException();
        }
        return Boolean(await this.contestRepository.remove(constest));
    }
}
