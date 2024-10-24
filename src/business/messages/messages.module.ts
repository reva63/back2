import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageAttachmentEntity } from './entities/messageAttachment.entity';
import { MessagesService } from './services/messages.service';
import { MessagesGateway } from './gateways/messages.gateway';
import { ChatsModule } from '../chats/chats.module';
import { MessageSubscriber } from './subscribers/message.subscriber';

@Module({
    imports: [
        ChatsModule,
        TypeOrmModule.forFeature([MessageEntity, MessageAttachmentEntity]),
    ],
    providers: [MessagesService, MessagesGateway, MessageSubscriber],
})
export class MessagesModule {}
