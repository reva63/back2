import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { S3Service } from 'src/core/S3/s3.service';
import { randomBytes } from 'crypto';
import { IFile } from 'src/core/abstract/interfaces/file.interface';
import { AttachmentEntityAbstract } from 'src/core/abstract/entities/attachment.entity.abstract';

@Injectable()
export class AttachmentsService {
    private readonly _bucket = process.env.S3CLIENT_BUCKET;

    constructor(private readonly s3Service: S3Service) {}

    /**
     * Saves files to S3 then create attachments array
     * @returns attachments array
     */
    async saveFiles(
        files: IFile[] = [],
    ): Promise<DeepPartial<AttachmentEntityAbstract>[]> {
        const attachments = [] as DeepPartial<AttachmentEntityAbstract>[];
        for await (const file of files) {
            const key = this.generateS3Key(file.mimetype);
            const output = await this.s3Service.uploadObject({
                Key: key,
                Bucket: this._bucket,
                Body: file.buffer,
            });
            attachments.push({
                key: key,
                link: output.Location,
                originalName: file.originalName,
            });
        }

        return attachments;
    }

    async removeFileByKey(key: string) {
        const isExists = await this.s3Service.checkObject({
            Bucket: this._bucket,
            Key: key,
        });
        if (isExists) {
            await this.s3Service.deleteObject({
                Bucket: this._bucket,
                Key: key,
            });
        }
    }

    protected generateS3Key(mimetype: string) {
        const mimeSplit = mimetype.split('/');
        return `${Date.now().toString()}_${randomBytes(4).join('')}.${mimeSplit[1]}`;
    }
}
