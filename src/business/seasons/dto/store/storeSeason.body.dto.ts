import { IsNumber } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreSeasonBodyDto implements IBodyDto {
    @IsNumber()
    year: number;
    @IsNumber()
    number: number;
}
