import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class UpdateBannerParamsDto implements IParamsDto {
    @IsNumberString()
    banner: number;
}
