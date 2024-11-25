import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { NotificationTypes } from 'src/core/types/notificationTypes.enum';

export class StoreNotificationBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsNumber()
    reciever: number;

    @IsEnum(NotificationTypes)
    type: string;
}
