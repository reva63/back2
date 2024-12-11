import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateUserBodyDto implements IBodyDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;
}
