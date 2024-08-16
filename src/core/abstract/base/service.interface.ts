import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { BodyDtoInterface } from './dto/bodyDto.interface';
import { QueryDtoInterface } from './dto/queryDto.interface';
import { Paragraph } from '../../../publications/entities/paragraph/paragraph.entity';
import { TextParagraph } from '../../../publications/entities/paragraph/textParagraph.entity';
import { ImgParagraph } from '../../../publications/entities/paragraph/imgParagraph.entity';
import { LinkParagraph } from '../../../publications/entities/paragraph/linkParagraph.entity';
import { PublicationResponseDto } from '../../../publications/builders/types/publication.response.dto';

export interface ServiceInterface<T> {
    list?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T[]> | Promise<[PublicationResponseDto[], number]>;

    show?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T | null> | Promise<PublicationResponseDto | null>;

    store?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ):
        | Promise<boolean>
        | Promise<{ id: number }>
        | Promise<
              Array<Paragraph | TextParagraph | ImgParagraph | LinkParagraph>
          >;

    update?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;

    remove?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;
}
