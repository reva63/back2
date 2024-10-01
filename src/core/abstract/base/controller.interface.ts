import { IBodyDto } from './dto/bodyDto.interface';
import { IParamsDto } from './dto/paramsDto.interface';
import { IQueryDto } from './dto/queryDto.interface';

export interface IController {
    list<T>(options: { params?: IParamsDto; query?: IQueryDto }): Promise<T>;

    show<T>(options: { params?: IParamsDto; body?: IBodyDto }): Promise<T>;

    store<T>(options: { params?: IParamsDto; body?: IBodyDto }): Promise<T>;

    update<T>(options: { params?: IParamsDto; body?: IBodyDto }): Promise<T>;

    remove<T>(options: { params?: IParamsDto; body?: IBodyDto }): Promise<T>;
}
