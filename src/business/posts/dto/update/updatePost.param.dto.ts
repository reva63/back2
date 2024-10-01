import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class UpdatePostParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    post: number;
}
