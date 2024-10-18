import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { Server, Socket } from 'socket.io';
import { AssignToChatPayloadDto } from '../dto/ws/assignToChat.payload.dto';
import { getRoomId } from '../helper/getRoomId.helper';

@WebSocketGateway({ namespace: 'chats/operator' })
export class OperatorChatsGateway {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly chatsService: ChatsService) {}

    @SubscribeMessage('send_assign_to_chat')
    async assignToChat(
        @MessageBody() payload: AssignToChatPayloadDto,
        @ConnectedSocket() socket: Socket,
    ) {
        await this.chatsService.assignCurrentOperator({
            params: { chat: payload.chat },
        });

        const roomId = getRoomId(payload.chat);
        await socket.join(roomId);
    }
}
