import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IsString } from 'class-validator';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';
import { ValidateParagraphs } from '../../decorators/validateParagraphs.decorator';

export class StoreContestBodyDto implements IBodyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @ValidateParagraphs()
    upsertParagraphs: ParagraphDto[];
}
