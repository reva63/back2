import { SessionPayloadInterface } from 'src/business/auth/interfaces/sessionPayload.interface';

export interface ServiceInterface<T> {
    yandexAuth(
        email: string,
        payload: SessionPayloadInterface,
        device_id: string | null,
    ): Promise<T>;
}
