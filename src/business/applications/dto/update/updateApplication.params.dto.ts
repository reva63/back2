import { IsNumber } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class UpdateApplicationParamsDto implements IParamsDto {
    @IsNumber()
    application: number;
}
