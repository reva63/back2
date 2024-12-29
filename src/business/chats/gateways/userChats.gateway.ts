import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { getRoomId } from '../helper/getRoomId.helper';
import { WsExceptionFilter } from 'src/core/common/filters/wsException.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { UserSocket } from 'src/core/abstract/interfaces/userSocket.interface';
import { WebSocketJwtGuard } from 'src/business/auth/guard/webSocket.jwt.guard';

@WebSocketGateway({ namespace: 'chats/user', cors: { origin: '*' } })
@UseGuards(WebSocketJwtGuard)
@UseFilters(WsExceptionFilter)
export class UserChatsGateway implements OnGatewayConnection {
    constructor(private readonly chatsService: ChatsService) {}

    async handleConnection(client: UserSocket) {
        const user = client.user;
        const chat =
            (await this.chatsService.showUserChat({ params: { user } })) ??
            (await this.chatsService.store({ params: { user } }));
        const roomId = getRoomId(chat.id);
        await client.join(roomId);
    }
}
