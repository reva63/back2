import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { S3Service } from 'src/core/S3/s3.service';
import { randomBytes } from 'crypto';
import { IFile } from 'src/core/abstract/interfaces/file.interface';
import { AttachmentEntityAbstract } from 'src/core/abstract/entities/attachment.entity.abstract';

@Injectable()
export class AttachmentsService {
    constructor(private readonly s3Service: S3Service) {}

    /**
     * Saves file to S3 then updates entity object with key, link and name
     * @param entity entity object
     * @returns the same entity object
     */
    async saveThenUpdate(
        file: IFile,
        entity: AttachmentEntityAbstract,
    ): Promise<DeepPartial<AttachmentEntityAbstract>> {
        const key = this.generateS3Key(file.mimetype);
        const output = await this.s3Service.uploadObject({
            Key: key,
            Bucket: process.env.S3CLIENT_BUCKET,
            Body: file.buffer,
        });
        entity.key = key;
        entity.link = output.Location;
        entity.storedName = file.originalname;

        return entity;
    }

    protected generateS3Key(mimetype: string) {
        const mimeSplit = mimetype.split('/');
        return `${Date.now().toString()}_${randomBytes(8).join('')}.${mimeSplit[1]}`;
    }
}
