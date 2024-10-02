import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class GetRatingByIdParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    rating: number;
}
