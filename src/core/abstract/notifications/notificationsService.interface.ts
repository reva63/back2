import { PayloadDtoInterface } from './dto/payloadDto.interface';

export interface NotificationsInterface {
    sendNotification(
        topic: string,
        payload: PayloadDtoInterface,
    ): Promise<void>;
}
