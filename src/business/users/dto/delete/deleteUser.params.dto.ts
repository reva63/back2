import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeleteUserParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    user: number;
}
