import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ParagraphTypes } from '../types/paragraphTypes.enum';

export abstract class ParagraphDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsEnum(ParagraphTypes)
    type: ParagraphTypes;

    @IsNumber()
    order: number;
}
