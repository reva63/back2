import { Module } from '@nestjs/common';
import { AttachmentsService } from './services/attachments.service';

@Module({
    providers: [AttachmentsService],
    exports: [AttachmentsService],
})
export class AttachmentsModule {}
