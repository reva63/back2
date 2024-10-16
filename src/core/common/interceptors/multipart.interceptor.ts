import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { IFile } from 'src/core/abstract/interfaces/file.interface';

@Injectable()
export class MultipartInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest<FastifyRequest>();
        if (!req.isMultipart()) {
            throw new UnsupportedMediaTypeException(
                'ContentType must be multipart/form-data',
            );
        }

        const parts = req.parts();
        const body = { files: [] as IFile[] };
        try {
            for await (const part of parts) {
                if (part.type === 'file') {
                    const buffer = await part.toBuffer();
                    if (!buffer.length) {
                        continue;
                    }
                    body.files.push({
                        originalname: part.filename,
                        encoding: part.encoding,
                        fieldname: part.fieldname,
                        mimetype: part.mimetype,
                        size: buffer.length,
                        buffer,
                    });
                } else if (part.fieldname === 'data') {
                    const json = JSON.parse(part.value as string);
                    Object.assign(body, json);
                }
            }
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
        req.body = body;
        return next.handle();
    }
}
