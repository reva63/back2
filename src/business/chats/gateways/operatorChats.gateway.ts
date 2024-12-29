import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { Socket } from 'socket.io';
import { AssignToChatPayloadDto } from '../dto/ws/assignToChat.payload.dto';
import { getRoomId } from '../helper/getRoomId.helper';
import { CustomValidationPipe } from 'src/core/common/pipes/customValidation.pipe';
import { UseFilters, UsePipes } from '@nestjs/common';
import { WsExceptionFilter } from 'src/core/common/filters/wsException.filter';

@WebSocketGateway({ namespace: 'chats/operator', cors: true })
@UseFilters(WsExceptionFilter)
@UsePipes(CustomValidationPipe)
export class OperatorChatsGateway {
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
