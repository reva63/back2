import { ParamsDtoInterface } from './dto/paramsDto.interface';
import { BodyDtoInterface } from './dto/bodyDto.interface';
import { QueryDtoInterface } from './dto/queryDto.interface';

export interface ControllerInterface {
    list?(
        params: ParamsDtoInterface,
        query?: QueryDtoInterface,
        body?: BodyDtoInterface,
    ): Promise<string>;

    show?(params: ParamsDtoInterface, body?: BodyDtoInterface): Promise<string>;

    store?(
        params: ParamsDtoInterface,
        body: BodyDtoInterface,
    ): Promise<void | string>;

    update?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;

    remove?(params: ParamsDtoInterface, body: BodyDtoInterface): Promise<void>;
}
