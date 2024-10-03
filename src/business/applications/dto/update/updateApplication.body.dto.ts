import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateApplicationBodyDto implements IBodyDto {
    @IsObject()
    @IsOptional()
    applicantSocials: { [key: string]: string };
}
