import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { AttributeEntity } from '../entities/attribute.entity';
import { DeepPartial, Repository } from 'typeorm';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeNotFoundException } from 'src/exceptions/attribute/attributeNotFound.exception';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';
import { SpecialAttributeException } from 'src/exceptions/attribute/specialAttribute.exception';

@Injectable()
export class AttributesService implements IService<AttributeEntity> {
    constructor(
        @InjectRepository(AttributeEntity)
        private readonly attributesRepository: Repository<AttributeEntity>,
    ) {}

    async list(): Promise<AttributeEntity[]> {
        return this.attributesRepository.find();
    }

    async show(options: { params?: IParamsDto }): Promise<AttributeEntity> {
        const attribute = await this.attributesRepository.findOneBy({
            id: options.params.attribute,
        });

        if (!attribute) throw new AttributeNotFoundException();

        return attribute;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<AttributeEntity> {
        const { name, type, comment } = options.body;

        if (type === AttributeTypes.Special) {
            throw new SpecialAttributeException();
        }

        const creatable = {
            name,
            type,
            comment: comment ?? null,
        } as DeepPartial<AttributeEntity>;

        await this.attributesRepository.save(creatable);

        return await this.attributesRepository.findOneBy({ name });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<AttributeEntity> {
        const { name, type, comment } = options.body;

        if (type === AttributeTypes.Special) {
            throw new SpecialAttributeException();
        }

        const attribute = await this.attributesRepository.findOneBy({
            id: options.params.attribute,
        });

        if (!attribute) throw new AttributeNotFoundException();

        attribute.name = name ?? attribute.name;
        attribute.type = (type as AttributeTypes) ?? attribute.type;
        attribute.comment = comment ?? attribute.comment;

        return await this.attributesRepository.save(attribute);
    }

    async remove(options: { params?: IParamsDto }): Promise<void> {
        const attribute = await this.attributesRepository.findOneBy({
            id: options.params.attribute,
        });

        if (!attribute) throw new AttributeNotFoundException();

        await this.attributesRepository.remove(attribute);
    }
}
