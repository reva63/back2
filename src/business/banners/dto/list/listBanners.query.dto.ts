import { IsNumberString } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListBannersQueryDto implements IQueryDto {
    @IsNumberString()
    user: number;
}
