import { IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateCertificateBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    key: string;

    @IsString()
    @IsOptional()
    name: string;
}
