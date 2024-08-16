import { Languages } from '../../../types/languages.enum';
import { PublicationStatus } from '../../../types/publicationStatus.enum';
import {
    ImgParagraphDto,
    LinkParagraphDto,
    TextParagraphDto,
} from '../../../types/pharagrapDto.type';

export interface BodyDtoInterface {
    title?: string;
    lang?: Languages;
    status?: PublicationStatus;
    description?: string;
    paragraphs?: Array<TextParagraphDto | ImgParagraphDto | LinkParagraphDto>;
    publicationsGroupId?: number;
}
