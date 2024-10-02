import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeleteApplicationParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    application: number;
}
