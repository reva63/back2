import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { SessionPayloadInterface } from 'src/business/auth/interfaces/sessionPayload.interface';

export interface ControllerInterface {
    yandexAuth(): void;

    yandexAuthCallback(req: FastifyRequest, res: FastifyReply): void;

    successYandex(
        token: string,
        res: FastifyReply,
        payload: SessionPayloadInterface,
        device_id: string,
    ): Observable<void>;
}
