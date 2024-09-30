import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/ratings/dto/paramsDto.abstract';

export class DeleteRatingParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
