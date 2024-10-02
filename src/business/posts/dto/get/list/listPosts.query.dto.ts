import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListPostsQueryDto implements IQueryDto {
    @IsNotEmpty()
    @IsNumber()
    page: number;

    @IsNotEmpty()
    @IsNumber()
    limit: number;

    @IsNotEmpty()
    @IsIn(['desc', 'asc'])
    sort: 'desc' | 'asc';
}
