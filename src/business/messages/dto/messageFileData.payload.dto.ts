import { IsInt, IsMimeType, IsString } from 'class-validator';
import { IFile } from 'src/core/abstract/interfaces/file.interface';
import { IsBuffer } from 'src/core/common/decorators/validation/isBuffer.decorator';

export class MessageFileDataPayloadDto implements IFile {
    @IsMimeType()
    mimetype: string;

    @IsInt()
    size: number;

    @IsBuffer()
    buffer: Buffer;

    @IsString()
    originalName: string;
}
