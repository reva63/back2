import { IsMimeType, IsNumber, IsString } from 'class-validator';
import { IFile } from 'src/core/abstract/interfaces/file.interface';
import { HasMimeType } from 'src/core/common/decorators/validation/hasMimeType.decorator';
import { IsBuffer } from 'src/core/common/decorators/validation/isBuffer.decorator';
import { MimeTypes } from 'src/core/types/mimeTypes.enum';

export class ApplicationFileDataBodyDto implements IFile {
    @IsString()
    originalName: string;

    @IsBuffer()
    buffer: Buffer;

    @HasMimeType([MimeTypes.PDF])
    @IsMimeType()
    mimetype: string;

    @IsNumber()
    size: number;
}
