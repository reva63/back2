import { ParagraphTypes } from 'src/core/types/paragraphTypes.enum';

export interface IParagraph {
    order: number;
    type: ParagraphTypes;

    id?: number;
    link?: string;
    text?: string;
}
