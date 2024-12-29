import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsString } from 'class-validator';
import { ValidateParagraphs } from '../../decorators/validateParagraphs.decorator';
import { ParagraphDto } from '../paragraphs/paragraph.dto';

export class StoreContestBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    preview: string;

    @ValidateParagraphs()
    upsertParagraphs: ParagraphDto[];
}
