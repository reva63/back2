import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { DirectionEntity } from '../entities/direction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { Repository, DeepPartial } from 'typeorm';
import { DirectionNotFoundException } from 'src/exceptions/directions/directionNotFound.exception';

@Injectable()
export class DirectionsService implements IService<DirectionEntity> {
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
            throw new DirectionNotFoundException();
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
    }): Promise<DirectionEntity> {
        const creatable = {
            title: options.body.title,
        } as DeepPartial<DirectionEntity>;

        await this.directionsRepository.update(
            { id: options.params.direction },
            creatable,
        );

        return await this.directionsRepository.findOneBy({
            id: options.params.direction,
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const direction = await this.directionsRepository.findOneBy({
            id: options.params.direction,
        });
        if (!direction) {
            throw new DirectionNotFoundException();
        }
        await this.directionsRepository.remove(direction);
    }
}
