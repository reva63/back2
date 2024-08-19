import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { PayloadDtoInterface } from './dto/payloadDto.interface';

export interface ServiceInterface
    extends OnGatewayConnection,
        OnGatewayDisconnect {
    sendNotification(
        topic: string,
        payload: PayloadDtoInterface,
    ): Promise<void>;
}
