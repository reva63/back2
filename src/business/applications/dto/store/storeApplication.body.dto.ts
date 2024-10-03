import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ApplicantDataBodyDto } from '../applicantData.body.dto';
import { FileType } from 'src/core/types/file.type';
import {
    IsArray,
    IsNumber,
    IsObject,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StoreApplicationBodyDto implements IBodyDto {
    @IsNumber()
    contest: number;

    @IsNumber({}, { each: true })
    @ValidateNested()
    @IsArray()
    categories: number[];

    @ValidateNested()
    @Type(() => ApplicantDataBodyDto)
    applicantData: ApplicantDataBodyDto;

    @IsObject()
    @IsOptional()
    applicantSocials: { [key: string]: string };

    @ValidateNested()
    @Type(() => FileType)
    files: FileType[];
}
