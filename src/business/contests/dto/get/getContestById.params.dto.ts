import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class GetContestByIdParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
