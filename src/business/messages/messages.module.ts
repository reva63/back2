import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageAttachmentEntity } from './entities/messageAttachment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntity, MessageAttachmentEntity]),
    ],
})
export class MessagesModule {}
