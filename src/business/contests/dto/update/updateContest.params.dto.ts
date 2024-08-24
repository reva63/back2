import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/contests/dto/paramsDto.abstract';

export class UpdateContestParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
