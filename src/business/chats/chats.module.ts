import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { ChatsService } from './services/chats.service';
import { UserChatsGateway } from './gateways/userChats.gateway';
import { OperatorChatsGateway } from './gateways/operatorChats.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity]), ConfigModule],
    providers: [ChatsService, UserChatsGateway, OperatorChatsGateway],
    exports: [ChatsService],
})
export class ChatsModule {}
