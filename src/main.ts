import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import * as cookieParser from 'cookie-parser';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            rawBody: true,
        },
    );

    app.use(cookieParser());
    app.enableCors({ origin: '*' });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.register(fastifyCookie);

    await app.listen(
        +process.env.APP_LISTEN_PORT! || 3000,
        process.env.APP_LISTEN_ADDRESS! || '0.0.0.0',
    );
}
bootstrap();
