import { IsNumber, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateCategoryBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsNumber()
    direction: number;
}
