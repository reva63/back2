import { IBodyDto } from './bodyDto.interface';
import { IParamsDto } from './paramsDto.interface';
import { IQueryDto } from './queryDto.interface';

export interface IPayloadDto extends IParamsDto, IBodyDto, IQueryDto {}
