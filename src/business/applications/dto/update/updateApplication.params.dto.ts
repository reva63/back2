import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/applications/dto/paramsDto.abstract';

export class UpdateApplicationParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
