import { Injectable } from '@nestjs/common';
import { SeasonEntity } from '../entities/season.entity';
import { IService } from 'src/core/abstract/base/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';
import { SeasonNotFoundException } from 'src/exceptions/seasons/seasonNotFound.exception';
import { SeasonNotEmptyException } from 'src/exceptions/seasons/seasonNotEmpty.exception';

@Injectable()
export class SeasonsService implements IService<SeasonEntity> {
    constructor(
        @InjectRepository(SeasonEntity)
        private seasonsRepository: Repository<SeasonEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<SeasonEntity[]> {
        return await this.seasonsRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<SeasonEntity> {
        const season = await this.seasonsRepository.findOneBy({
            id: options.params.season,
        });
        if (!season) {
            throw new SeasonNotFoundException();
        }
        return season;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<SeasonEntity> {
        const creatable = {
            number: options.body.number,
            year: options.body.year,
        } as DeepPartial<SeasonEntity>;
        return await this.seasonsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<SeasonEntity> {
        const creatable = {
            number: options.body.number,
            year: options.body.year,
        } as DeepPartial<SeasonEntity>;

        await this.seasonsRepository.update(
            { id: options.params.season },
            creatable,
        );

        return await this.seasonsRepository.findOneBy({
            id: options.params.season,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const season = await this.seasonsRepository.findOne({
            where: {
                id: options.params.season,
            },
            relations: ['contests'],
        });
        if (!season) {
            throw new SeasonNotFoundException();
        }
        if (season.contests.length != 0) {
            throw new SeasonNotEmptyException();
        }
        await this.seasonsRepository.remove(season);
    }
}
