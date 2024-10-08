import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { DirectionEntity } from '../entities/direction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class DirectionsService implements IService<DirectionEntity>{
    constructor(
        @InjectRepository(DirectionEntity)
        private directionsRepository: Repository<DirectionEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<DirectionEntity[]> {
        return await this.directionsRepository.find();
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<DirectionEntity> {
        const direction = await this.directionsRepository.findOneBy({
            id: options.params.direction,
        });
        if (!direction) {
            throw new NotFoundException();
        }
        return direction;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<DirectionEntity> {
        const creatable = {
            title: options.body.title,
        } as DeepPartial<DirectionEntity>;
        return await this.directionsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {
            title: options.body.title,
        } as DeepPartial<DirectionEntity>;
        return Boolean(
            await this.directionsRepository.update(
                { id: options.params.direction },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const direction = await this.directionsRepository.findOneBy({
            id: options.params.direction,
        });
        if (!direction) {
            throw new NotFoundException();
        }
        return Boolean(await this.directionsRepository.remove(direction));
    }
}
