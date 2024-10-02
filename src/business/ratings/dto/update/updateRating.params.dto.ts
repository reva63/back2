import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class UpdateRatingParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    rating: number;
}
