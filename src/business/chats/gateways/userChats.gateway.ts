import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { Socket } from 'socket.io';
import { getRoomId } from '../helper/getRoomId.helper';
import { WsExceptionFilter } from 'src/core/common/filters/wsException.filter';
import { UseFilters } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chats/user', cors: { origin: '*' } })
@UseFilters(WsExceptionFilter)
export class UserChatsGateway implements OnGatewayConnection {
    constructor(private readonly chatsService: ChatsService) {}

    async handleConnection(client: Socket) {
        // TODO: get user id from socket
        const user = 1;
        const chat =
            (await this.chatsService.showUserChat({ params: { user } })) ??
            (await this.chatsService.store({ params: { user } }));
        const roomId = getRoomId(chat.id);
        await client.join(roomId);
    }
}
