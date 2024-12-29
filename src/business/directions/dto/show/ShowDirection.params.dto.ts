import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class ShowDirectionParamsDto implements IParamsDto {
    @IsNumberString()
    direction: number;
}
