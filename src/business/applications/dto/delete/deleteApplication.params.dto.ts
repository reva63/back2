import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/applications/dto/paramsDto.abstract';

export class DeleteApplicationParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
