import { IsNumber, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreCertificateBodyDto implements IBodyDto {
    @IsString()
    key: string;

    @IsString()
    name: string;

    @IsNumber()
    user: number;

    @IsNumber()
    contest: number;

    @IsNumber()
    direction: number;

    @IsNumber()
    category: number;

    @IsNumber()
    stage: number;
}
