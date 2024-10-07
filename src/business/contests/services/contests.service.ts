import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { ContestEntity } from '../entities/contest.entity';
import { ParagraphsService } from './paragraphs.service';

@Injectable()
export class ContestsService implements IService<ContestEntity> {
    constructor(
        @InjectRepository(ContestEntity)
        private readonly contestsRepository: Repository<ContestEntity>,
        private readonly paragraphsService: ParagraphsService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ContestEntity[]> {
        return await this.contestsRepository.find({
            relations: { paragraphs: true },
        });
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
    }): Promise<ContestEntity> {
        const paragraphs = await this.paragraphsService.create(options);
        const creatable = {
            paragraphs,
        } as DeepPartial<ContestEntity>;

        return await this.contestsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        if (options.body.upsertParagraphs?.length > 0) {
            await this.paragraphsService.update(options);
        }

        if (options.body.removeParagraphs?.length > 0) {
            await this.paragraphsService.remove(options);
        }

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
