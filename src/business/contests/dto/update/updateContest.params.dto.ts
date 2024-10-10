import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class UpdateContestParamsDto implements IParamsDto {
    @IsNumberString()
    contest: number;
}
