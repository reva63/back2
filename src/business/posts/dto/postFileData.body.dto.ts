import { IsMimeType, IsNumber, IsString } from 'class-validator';
import { IFile } from 'src/core/abstract/interfaces/file.interface';
import { IsBuffer } from 'src/core/common/decorators/validation/isBuffer.decorator';

export class PostFileDataBodyDto implements IFile {
    @IsString()
    originalName: string;

    @IsBuffer()
    buffer: Buffer;

    @IsMimeType()
    mimetype: string;

    @IsNumber()
    size: number;
}
