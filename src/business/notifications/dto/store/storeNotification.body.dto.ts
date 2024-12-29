import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { NotificationTypes } from 'src/core/types/notificationTypes.enum';

export class StoreNotificationBodyDto implements IBodyDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    author: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(NotificationTypes)
    type: string;
}
