import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const SessionPayload = createParamDecorator(
    (_: string, ctx: ExecutionContext) => {
        const request: FastifyRequest = ctx.switchToHttp().getRequest();
        return { device_name: request.headers['user-agent'], ip: request.ip };
    },
);
