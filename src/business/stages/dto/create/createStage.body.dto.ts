import {
    IsArray,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class CreateStageBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumber()
    @IsOptional()
    contest: number;

    @IsNumber({}, { each: true })
    @IsArray()
    @IsOptional()
    certificates: number[];
}
