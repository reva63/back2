import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class UpdateApplicationParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    application: number;
}
