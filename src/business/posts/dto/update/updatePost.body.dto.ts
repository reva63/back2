import {
    IsArray,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { PostFileDataBodyDto } from '../postFileData.body.dto';

export class UpdatePostBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PostFileDataBodyDto)
    files: PostFileDataBodyDto[];
}
