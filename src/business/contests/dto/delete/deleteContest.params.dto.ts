import { IsNumber } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/dto/paramsDto.abstract';

export class DeleteContestParamsDto extends ParamsDtoAbstract {
    @IsNumber()
    contest: number;
}
