import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from '../services/messages.service';
import { StoreMessagePayloadDto } from '../dto/ws/storeMessage.payload.dto';
import { Server, Socket } from 'socket.io';
import { getRoomId } from 'src/business/chats/helper/getRoomId.helper';
import { UpdateMessagePayloadDto } from '../dto/ws/updateMessage.payload.dto';
import { RemoveMessagePayloadDto } from '../dto/ws/removeMessage.payload.dto';
import { UseFilters, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from 'src/core/common/pipes/customValidation.pipe';
import { WsExceptionFilter } from 'src/core/common/filters/wsException.filter';
import { ListMessagesPayloadDto } from '../dto/ws/listMessages.payload.dto';

@WebSocketGateway({ namespace: 'chats/user', cors: true })
@UseFilters(WsExceptionFilter)
@UsePipes(CustomValidationPipe)
export class MessagesGateway {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly messagesService: MessagesService) {}

    @SubscribeMessage('request_message_list')
    async onGetMessages(
        @MessageBody() payload: ListMessagesPayloadDto,
        @ConnectedSocket() socket: Socket,
    ) {
        const { page, limit, chat } = payload;
        const messages = await this.messagesService.list({
            params: { chat },
            query: { page, limit },
        });

        socket.emit('receive_message_list', { messages });
    }

    @SubscribeMessage('send_new_message')
    async onNewMessage(@MessageBody() payload: StoreMessagePayloadDto) {
        const { chat, ...body } = payload;
        const newMessage = await this.messagesService.store({
            params: { chat },
            body,
        });
        const roomId = getRoomId(chat);
        this.server.to(roomId).emit('new_message_sent', {
            chatId: chat,
            newMessage,
        });
    }

    @SubscribeMessage('update_message')
    async onUpdateMessage(@MessageBody() payload: UpdateMessagePayloadDto) {
        const { message, ...body } = payload;
        const updatedMessage = await this.messagesService.update({
            params: { message },
            body,
        });
        const roomId = getRoomId(updatedMessage.chatId);
        this.server.to(roomId).emit('message_updated', {
            chatId: updatedMessage.chatId,
            updatedMessage,
        });
    }

    @SubscribeMessage('remove_message')
    async onRemoveMessage(@MessageBody() payload: RemoveMessagePayloadDto) {
        const { message } = payload;
        await this.messagesService.remove({ params: { message } });
        const roomId = getRoomId(payload.chat);
        this.server.to(roomId).emit('message_removed', {
            chatId: payload.chat,
            messageId: message,
        });
    }
}
