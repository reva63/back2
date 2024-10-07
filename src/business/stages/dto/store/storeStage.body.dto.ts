import { IsDateString, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreStageBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}
