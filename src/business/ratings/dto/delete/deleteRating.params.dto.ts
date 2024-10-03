import { IsNumber } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class DeleteRatingParamsDto implements IParamsDto {
    @IsNumber()
    rating: number;
}
