import { IsNumber, IsString, IsUrl } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreBannerBodyDto implements IBodyDto {
    @IsString()
    header: string;

    @IsString()
    text: string;

    @IsString()
    buttonText: string;

    @IsUrl()
    buttonUrl: string;

    @IsNumber()
    user: number;
}
