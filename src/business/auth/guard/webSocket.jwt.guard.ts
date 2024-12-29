import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserSocket } from 'src/core/abstract/interfaces/userSocket.interface';
import { WsExceptionFilter } from 'src/core/common/filters/wsException.filter';

@UseFilters(WsExceptionFilter)
@Injectable()
export class WebSocketJwtGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient<UserSocket>();
        const token =
            client.handshake.auth?.token ?? client.handshake.headers?.token;

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const user = this.jwtService.verify(token, {
                secret: this.configService.getOrThrow('JWT_SECRET'),
            });

            client.user = user.id;
            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
