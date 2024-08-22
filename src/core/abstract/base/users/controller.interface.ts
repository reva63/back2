import { BodyDtoInterface } from './dto/bodyDto.interface';
import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { QueryDtoInterface } from './dto/queryDto.interface';

export interface ControllerInterface<T> {
    list?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T[]>;

    show?(params: ParamsDtoInterface, body?: BodyDtoInterface): Promise<T>;

    store?(
        body: BodyDtoInterface,
        params?: ParamsDtoInterface,
    ): Promise<void | T>;

    update?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;

    remove?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;
}
