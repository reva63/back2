import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeletePostParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    post: number;
}
