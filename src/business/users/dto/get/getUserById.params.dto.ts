import { IsUUID } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class GetUserByIdParamsDto extends ParamsDtoAbstract {
    @IsUUID('4')
    user: string;
}
