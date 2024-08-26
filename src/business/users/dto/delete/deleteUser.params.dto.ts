import { IsString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/users/dto/paramsDto.abstract';

export class DeleteUserParamsDto extends ParamsDtoAbstract {
    @IsString()
    idOrEmail: string;
}
