import { Global, Module } from '@nestjs/common';
import { AttachmentsService } from './services/attachments.service';

@Global()
@Module({
    providers: [AttachmentsService],
    exports: [AttachmentsService],
})
export class AttachmentsModule {}
