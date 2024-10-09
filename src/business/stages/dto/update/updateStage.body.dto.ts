import { IsString, IsDateString, IsOptional } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateStageBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsDateString()
    @IsOptional()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate: Date;
}
