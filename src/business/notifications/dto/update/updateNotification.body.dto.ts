import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { NotificationTypes } from 'src/core/types/notificationTypes.enum';

export class UpdateNotificationBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsEnum(NotificationTypes)
    @IsOptional()
    type: string;
}
