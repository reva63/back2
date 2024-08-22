import 'fastify';

declare module 'fastify' {
    interface FastifyReply {
        setHeader(key: string, value: string | number): FastifyReply;
        end(): void;
    }
}
