import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ProfileDataBodyDto } from '../profileData.body.dto';
import { FileType } from 'src/core/types/file.type';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SocialDataBodyDto } from '../socialData.body.dto';

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
    @Type(() => ProfileDataBodyDto)
    @IsNotEmpty()
    profileData: ProfileDataBodyDto;

    @ValidateNested({ each: true })
    @Type(() => SocialDataBodyDto)
    @IsArray()
    socialData: SocialDataBodyDto[];

    @ValidateNested()
    @Type(() => FileType)
    files: FileType[];
}
