import { IsNumber } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class RemoveRatingParamsDto implements IParamsDto {
    @IsNumber()
    rating: number;
}
