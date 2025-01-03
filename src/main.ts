import { config } from 'dotenv';
config();
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import fastifyCookie from '@fastify/cookie';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import multiPart from '@fastify/multipart';
import { join } from 'path';
import * as fs from 'fs';
import { parse } from 'yaml';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './core/common/pipes/customValidation.pipe';
import { CustomSocketIOAdapter } from './core/adapters/customSocketIo.adapter';

async function bootstrap() {
    const httpsOptions = {
        //TODO: new certificate for production
        key: fs.readFileSync('./public/cert/key.pem'),
        cert: fs.readFileSync('./public/cert/cert.pem'),
    };
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ https: httpsOptions }),
        {
            rawBody: true,
        },
    );

    setupFastify(app);
    loadSwagger(app);

    app.use(cookieParser());
    app.enableCors({ origin: '*' });
    app.setGlobalPrefix('api', { exclude: ['auth/rsv'] });
    app.useGlobalPipes(new CustomValidationPipe());
    app.useWebSocketAdapter(new CustomSocketIOAdapter(app));

    await app.register(multiPart, {
        limits: {
            fileSize: 1024 * 1024 * 10, // 10 Mb,
        },
    });
    await app.register(fastifyCookie);

    await app.listen(
        process.env.APP_LISTEN_PORT || 5000,
        process.env.APP_LISTEN_ADDRESS || '0.0.0.0',
    );
}

function loadSwagger(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
        .setTitle('KARDO API Documentation')
        .setDescription('API documentation for Kardo')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api', app, document);
}

function setupFastify(app: NestFastifyApplication) {
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
}

bootstrap();
