import { IsNumber } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class GetContestByIdParamsDto implements IParamsDto {
    @IsNumber()
    contest: number;
}
