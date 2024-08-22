import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class UpdatePostParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
