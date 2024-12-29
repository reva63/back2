import { Inject, Injectable } from '@nestjs/common';
import {
    DeleteObjectCommand,
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { S3ModuleOptions } from './interfaces/s3ModuleOptions.interface';
import axios, { AxiosResponse } from 'axios';
import { createHash } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
    private client: S3Client;

    constructor(@Inject('S3ModuleOptions') private options: S3ModuleOptions) {
        this.client = new S3Client({
            credentials: {
                accessKeyId: this.options.credentials.accessKeyId || '',
                secretAccessKey: this.options.credentials.secretAccessKey || '',
            },
            endpoint: this.options.endpoint || '',
            region: this.options.region || '',
        });
    }

    async getSignedUrl(options: { Bucket: any; Key: string }) {
        const command = new GetObjectCommand(options);
        const expiresIn = process.env.S3CLIENT_URL_EXPIRES
            ? +process.env.S3CLIENT_URL_EXPIRES
            : 86400; // 24 hours

        return await getSignedUrl(this.client, command, { expiresIn });
    }

    async checkObject(options: { Bucket: any; Key: string }) {
        const command = new HeadObjectCommand(options);

        try {
            await this.client.send(command);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getObject(options: { Bucket: any; Key: string }) {
        const command = new GetObjectCommand(options);

        return await this.client.send(command);
    }

    async putObject(options: { Bucket: any; Key: string; Body: Uint8Array }) {
        const command = new PutObjectCommand(options);

        return await this.client.send(command);
    }

    async deleteObject(options: { Bucket: any; Key: string }) {
        const command = new DeleteObjectCommand(options);

        return await this.client.send(command);
    }

    /**
     * @returns image key with format `{data}.{ext}`
     */
    async loadAndPutObject(url: string): Promise<string> {
        const key = createHash('sha256').update(url).digest('base64');
        const isObjectExists = await this.checkObject({
            Bucket: process.env.S3CLIENT_BUCKET,
            Key: key,
        });

        if (!isObjectExists) {
            let res: AxiosResponse;

            try {
                res = await axios.get(url, {
                    responseType: 'arraybuffer',
                });
            } catch {
                return '';
            }

            if (!res.data) return '';

            const image = new Uint8Array(res.data);

            await this.putObject({
                Bucket: process.env.S3CLIENT_BUCKET,
                Key: key,
                Body: image,
            });
        }

        return key;
    }

    /**     *
     * @description upload file to s3
     * @returns output data including location url
     */
    async uploadObject(options: { Bucket: any; Key: string; Body: Buffer }) {
        return await new Upload({
            client: this.client,
            params: options,
        }).done();
    }
}
