import { IsNumber } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class ShowPostByIdParamsDto implements IParamsDto {
    @IsNumber()
    post: number;
}
