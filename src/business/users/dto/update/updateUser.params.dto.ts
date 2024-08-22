import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/users/dto/paramsDto.abstract';

export class UpdateUserParamsDto extends ParamsDtoAbstract {
    @IsNotEmpty()
    idOrEmail: string;
}
