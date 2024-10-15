import { IsNumberString } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListNotificationsQueryDto implements IQueryDto {
    @IsNumberString()
    user: number;
}
