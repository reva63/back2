import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListNotificationsQueryDto implements IQueryDto {
    @ApiProperty()
    @IsNumberString()
    user: number;
}
