import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { BodyDtoInterface } from './dto/bodyDto.interface';
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

    store?(body: BodyDtoInterface, params?: ParamsDtoInterface): Promise<T>;

    update?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;

    remove?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<boolean>;
}
