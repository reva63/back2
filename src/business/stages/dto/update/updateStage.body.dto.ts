import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumberString,
} from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsBuffer } from 'src/core/common/decorators/validation/isBuffer.decorator';

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

    @IsNumberString()
    @IsOptional()
    contest: number;

    @IsBuffer()
    @IsOptional()
    certificateTemplate: Buffer;
}
