import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';
import { ParagraphTypes } from 'src/core/paragraphs/types/paragraphTypes.enum';
import { ImageParagraphDto } from 'src/core/paragraphs/dto/imageParagraph.dto';
import { TextParagraphDto } from 'src/core/paragraphs/dto/textParagraph.dto';

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
