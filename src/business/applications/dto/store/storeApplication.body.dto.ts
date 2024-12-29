import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ApplicationProfileDataBodyDto } from '../applicationProfileData.body.dto';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationSocialDataBodyDto } from '../applicationSocialData.body.dto';
import { ApplicationFileDataBodyDto } from '../applicationFileData.body.dto';

export class StoreApplicationBodyDto implements IBodyDto {
    // TODO: remove after authentication comes
    @IsNumber()
    user: number;

    @IsNumber()
    contest: number;

    @IsNumber({}, { each: true })
    @IsArray()
    directions: number[];

    @IsNumber({}, { each: true })
    @IsArray()
    categories: number[];

    @ValidateNested()
    @Type(() => ApplicationProfileDataBodyDto)
    @IsNotEmpty()
    profileData: ApplicationProfileDataBodyDto;

    @ValidateNested({ each: true })
    @Type(() => ApplicationSocialDataBodyDto)
    @IsArray()
    socialData: ApplicationSocialDataBodyDto[];

    @ValidateNested({ each: true })
    @Type(() => ApplicationFileDataBodyDto)
    @IsArray()
    @IsOptional()
    files: ApplicationFileDataBodyDto[];
}
