import { IsString, IsDateString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateStageBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}
