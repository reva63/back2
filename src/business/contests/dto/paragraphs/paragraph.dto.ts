import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { IParagraph } from 'src/core/abstract/interfaces/paragraph.interface';
import { ParagraphTypes } from 'src/core/types/paragraphTypes.enum';

export abstract class ParagraphDto implements IParagraph {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsEnum(ParagraphTypes)
    type: ParagraphTypes;

    @IsNumber()
    order: number;
}
