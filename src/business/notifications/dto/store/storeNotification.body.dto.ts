import { IsNumber, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreNotificationBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsNumber()
    reciever: number;
}
