import { IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateDirectionBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;
}
