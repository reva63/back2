import {
    IsArray,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FileType } from '../../../../core/types/file.type';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class UpdatePostBodyDto implements IBodyDto {
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @IsString()
    text: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FileType)
    files: FileType[];
}
