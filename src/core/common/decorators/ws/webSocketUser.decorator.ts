import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserSocket } from 'src/core/abstract/interfaces/userSocket.interface';

export const WebSocketUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const socket = ctx.switchToWs().getClient<UserSocket>();
        return socket.user;
    },
);
