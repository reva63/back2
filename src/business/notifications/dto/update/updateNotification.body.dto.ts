import { IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateNotificationBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    text: string;
}
