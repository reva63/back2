import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';

export class ListUsersQueryDto implements IQueryDto {
    @ApiPropertyOptional()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    roles: string[];
}
