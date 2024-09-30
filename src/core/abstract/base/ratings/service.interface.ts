import { BodyDtoInterface } from './dto/bodyDto.interface';
import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { QueryDtoInterface } from './dto/queryDto.interface';

export interface ServiceInterface<T> {
    list?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T[]>;

    show?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T | null>;

    store?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<T>;

    update?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;

    remove?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;
}
