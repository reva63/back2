import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class UpdateUserParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}
