import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdateCertificateBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    key: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    user: number;

    @IsNumber()
    @IsOptional()
    contest: number;

    @IsNumber()
    @IsOptional()
    direction: number;

    @IsNumber()
    @IsOptional()
    category: number;

    @IsNumber()
    @IsOptional()
    stage: number;
}
