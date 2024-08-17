import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeleteUserParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}
