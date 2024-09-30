import { config } from 'dotenv';
config();
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            rawBody: true,
        },
    );

    const fastifyInstance = app.getHttpAdapter().getInstance();

    fastifyInstance.addHook(
        'onRequest',
        (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
            reply.setHeader = function (key, value) {
                return this.raw.setHeader(key, value);
            };
            reply.end = function () {
                this.raw.end();
            };
            request.res = reply;
            done();
        },
    );

    app.use(cookieParser());
    app.enableCors({ origin: '*' });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.register(fastifyCookie);

    await app.listen(
        process.env.APP_LISTEN_PORT || 3000,
        process.env.APP_LISTEN_ADDRESS || '0.0.0.0',
    );
}
bootstrap();
