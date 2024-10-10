import { DeepPartial } from 'typeorm';
import { IBodyDto } from './dto/bodyDto.interface';
import { IParamsDto } from './dto/paramsDto.interface';
import { IQueryDto } from './dto/queryDto.interface';

export interface IService<T> {
    list?(options: { params?: IParamsDto; query?: IQueryDto }): Promise<T[]>;

    show?(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean | T>;

    create?(
        options: {
            params?: IParamsDto;
            body?: IBodyDto;
        },
        isUpdate?: boolean,
    ): Promise<DeepPartial<T> | DeepPartial<T>[]>;

    store?(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean | T | T[]>;

    update?(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<T | T[]>;

    remove?(options: { params?: IParamsDto; body?: IBodyDto }): Promise<void>;
}
