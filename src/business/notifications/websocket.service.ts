import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import { PayloadDtoInterface } from 'src/core/abstract/notifications/dto/payloadDto.interface';
import { WebSocketInterface } from 'src/core/abstract/notifications/websocketService.interface';

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'notifications',
})
export class WebSocketService implements WebSocketInterface {
    @WebSocketServer()
    private readonly server: Server;

    constructor() {}

    handleConnection(client: Socket) {
        try {
            console.log(client.id);
            console.log('connected');
        } catch (error) {
            console.error('Connection error:', error);
            client.disconnect(true);
        }
    }

    handleDisconnect(client: Socket) {
        try {
            console.log(client.id);
            console.log('disconnected');
        } catch (error) {
            console.error('Disconnection error:', error);
        }
    }

    emitNotification(topic: string, payload: PayloadDtoInterface) {
        this.server.emit('notifications', { topic, data: payload });
    }
}
