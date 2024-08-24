import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { BodyDtoInterface } from './dto/bodyDto.interface';
import { QueryDtoInterface } from './dto/queryDto.interface';

export interface ControllerInterface<T> {
    list?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<T[]>;

    show?(params: ParamsDtoInterface, body?: BodyDtoInterface): Promise<T>;

    store?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<void | T>;

    update?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;

    remove?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;
}
