import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        res?: FastifyReply;
        user?: any;
    }
}
