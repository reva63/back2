import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsObject, IsOptional } from 'class-validator';
import { ApplicationSocialDataBodyDto } from '../applicationSocialData.body.dto';

export class UpdateApplicationBodyDto implements IBodyDto {
    @IsObject()
    @IsOptional()
    socialData: ApplicationSocialDataBodyDto[];
}
