import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { ChatsService } from './services/chats.service';
import { UserChatsGateway } from './gateways/userChats.gateway';
import { OperatorChatsGateway } from './gateways/operatorChats.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity])],
    providers: [ChatsService, UserChatsGateway, OperatorChatsGateway],
})
export class ChatsModule {}
