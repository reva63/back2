import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paragraph } from '../entities/paragraph.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

@Injectable()
export class ParagraphsService implements IService<Paragraph> {
    constructor(
        @InjectRepository(Paragraph)
        private readonly paragraphsRepository: Repository<Paragraph>,
    ) {}

    async create(
        options: {
            params?: IParamsDto;
            body?: IBodyDto;
        },
        isUpdate: boolean = false,
    ): Promise<DeepPartial<Paragraph>[]> {
        return options.body.upsertParagraphs.map((paragraph) => {
            const { id, type, order, ...data } = paragraph;
            return {
                id: isUpdate ? id : undefined,
                order,
                type,
                data,
            } as DeepPartial<Paragraph>;
        });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatables = await this.create(options, true);
        await this.paragraphsRepository.save(creatables);
        return true;
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const paragraphs = await this.paragraphsRepository.findBy({
            id: In(options.body.removeParagraphs),
        });
        await this.paragraphsRepository.remove(paragraphs);
        return true;
    }
}
