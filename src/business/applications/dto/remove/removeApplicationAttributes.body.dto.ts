import { IsObject, IsOptional } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class RemoveApplicationAttributesBodyDto implements IBodyDto {
    @IsObject()
    @IsOptional()
    applicantSocials: { [key: string]: string };
}
