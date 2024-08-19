import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { PayloadDtoInterface } from './dto/payloadDto.interface';

export interface WebSocketInterface
    extends OnGatewayConnection,
        OnGatewayDisconnect {
    emitNotification(topic: string, payload: PayloadDtoInterface): void;
}
