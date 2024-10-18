import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { Server, Socket } from 'socket.io';
import { getRoomId } from '../helper/getRoomId.helper';

@WebSocketGateway({ namespace: 'chats/user' })
export class UserChatsGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly chatsService: ChatsService) {}

    async handleConnection(client: Socket) {
        // TODO: get user id from socket
        const user = 0;
        const chat =
            (await this.chatsService.showUserChat({ params: { user } })) ??
            (await this.chatsService.store({ params: { user } }));
        const roomId = getRoomId(chat.id);
        await client.join(roomId);
    }
}
