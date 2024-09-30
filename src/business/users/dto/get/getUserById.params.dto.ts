import { IsString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/users/dto/paramsDto.abstract';

export class GetUserByIdParamsDto extends ParamsDtoAbstract {
    @IsString()
    idOrEmail: string;
}
