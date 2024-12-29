import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { TextParagraphDto } from '../dto/paragraphs/textParagraph.dto';
import { ImageParagraphDto } from '../dto/paragraphs/imageParagraph.dto';
import { ParagraphTypes } from 'src/core/types/paragraphTypes.enum';
import { ParagraphDto } from '../dto/paragraphs/paragraph.dto';

export function ValidateParagraphs() {
    return applyDecorators(
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(() => ParagraphDto, {
            keepDiscriminatorProperty: true,
            discriminator: {
                property: 'type',
                subTypes: [
                    { name: ParagraphTypes.Text, value: TextParagraphDto },
                    { name: ParagraphTypes.Image, value: ImageParagraphDto },
                ],
            },
        }),
    );
}
