import { IsOptional, IsString, IsUrl } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateBannerBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    header: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsString()
    @IsOptional()
    buttonText: string;

    @IsUrl()
    @IsOptional()
    buttonUrl: string;
}
