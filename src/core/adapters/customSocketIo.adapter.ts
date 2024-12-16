import { INestApplicationContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { Server, ServerOptions } from 'socket.io';
import { UserSocket } from '../abstract/interfaces/userSocket.interface';

export class CustomSocketIOAdapter extends IoAdapter {
    constructor(private app: INestApplicationContext) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const serverOptions = {
            ...options,
            cors: {
                origin: '*',
            },
        } as ServerOptions;
        const server: Server = super.createIOServer(port, serverOptions);

        const jwtService = this.app.get(JwtService);
        server.use(this.createTokenMiddleware(jwtService));
        server.of('/chats/user').use(this.createTokenMiddleware(jwtService));
        server
            .of('/chats/operator')
            .use(this.createTokenMiddleware(jwtService));

        return server;
    }

    private createTokenMiddleware(jwtService: JwtService) {
        return async (socket: UserSocket, next: NextFunction) => {
            const token =
                socket.handshake.auth?.token ?? socket.handshake.headers?.token;
            const configService = this.app.get(ConfigService);
            try {
                const userData = await jwtService.verifyAsync(token, {
                    secret: configService.getOrThrow('JWT_SECRET'),
                });
                socket.user = userData.id;
                next();
            } catch {
                next(new UnauthorizedException());
            }
        };
    }
}
