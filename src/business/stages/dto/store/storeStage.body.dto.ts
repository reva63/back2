import {
    IsDateString,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsBuffer } from 'src/core/common/decorators/validation/isBuffer.decorator';

export class StoreStageBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumberString()
    contest: number;

    @IsBuffer()
    @IsOptional()
    certificateTemplate: Buffer;
}
