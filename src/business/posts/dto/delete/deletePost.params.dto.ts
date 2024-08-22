import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeletePostParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
