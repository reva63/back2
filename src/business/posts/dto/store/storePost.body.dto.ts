import {
    IsArray,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { PostFileDataBodyDto } from '../postFileData.body.dto';

export class StorePostBodyDto implements IBodyDto {
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @IsString()
    text: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PostFileDataBodyDto)
    files: PostFileDataBodyDto[];
}
