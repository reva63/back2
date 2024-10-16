import { IsUrl } from 'class-validator';
import { ParagraphDto } from './paragraph.dto';

export class ImageParagraphDto extends ParagraphDto {
    @IsUrl()
    link: string;
}
