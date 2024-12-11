import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { NotificationTypes } from 'src/core/types/notificationTypes.enum';

export class UpdateNotificationBodyDto implements IBodyDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    content: string;

    @ApiPropertyOptional()
    @IsEnum(NotificationTypes)
    @IsOptional()
    type: NotificationTypes;
}
