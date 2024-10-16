import { IsString } from 'class-validator';
import { ParagraphDto } from './paragraph.dto';

export class TextParagraphDto extends ParagraphDto {
    @IsString()
    text: string;
}
