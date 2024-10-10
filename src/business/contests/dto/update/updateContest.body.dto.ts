import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ValidateParagraphs } from '../../decorators/validateParagraphs.decorator';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';

export class UpdateContestBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    preview: string;

    @ValidateParagraphs()
    @IsOptional()
    upsertParagraphs: ParagraphDto[];

    @IsNumber({}, { each: true })
    @IsArray()
    @IsOptional()
    removeParagraphs?: number[];
}
