import { IsNumber, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreCategoryBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsNumber()
    direction: number;
}
