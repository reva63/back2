import { QueryDtoAbstract } from '../../../../../core/abstract/base/dto/queryDto.abstract';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class ListPostsQueryDto extends QueryDtoAbstract {
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
