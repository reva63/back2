import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListPostsQueryDto implements IQueryDto {
    @IsNotEmpty()
    @IsNumberString()
    page: number;

    @IsNotEmpty()
    @IsNumberString()
    limit: number;

    @IsNotEmpty()
    @IsIn(['desc', 'asc'])
    sort: 'desc' | 'asc';
}
