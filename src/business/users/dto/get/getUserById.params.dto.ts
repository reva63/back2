import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class GetUserByIdParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    user: number;
}
