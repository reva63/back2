import { Module } from '@nestjs/common';
import { S3Module } from '../S3/s3.module';
import { AttachmentsService } from './services/attachments.service';

@Module({
    imports: [S3Module],
    providers: [AttachmentsService],
    exports: [AttachmentsService],
})
export class AttachmentsModule {}
