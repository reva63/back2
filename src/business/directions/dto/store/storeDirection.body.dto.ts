import { IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreDirectionBodyDto implements IBodyDto {
    @IsString()
    title: string;
}
