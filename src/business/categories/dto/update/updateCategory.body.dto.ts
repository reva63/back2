import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateCategoryBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsNumber()
    @IsOptional()
    direction: number;
}
