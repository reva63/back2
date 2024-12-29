import { IsNumber, IsOptional } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateSeasonBodyDto implements IBodyDto {
    @IsNumber()
    @IsOptional()
    year: number;
    @IsNumber()
    @IsOptional()
    number: number;
}
