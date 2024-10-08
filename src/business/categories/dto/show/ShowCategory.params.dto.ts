import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class ShowCategoryParamsDto implements IParamsDto {
    @IsNumberString()
    category: number;
}
