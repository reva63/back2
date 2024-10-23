import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class WsExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const client = host.switchToWs().getClient();
        const response = exception.getResponse();
        const message =
            typeof response === 'object'
                ? response
                : {
                      message: exception.message,
                      error: exception.name,
                      status: exception.getStatus(),
                  };

        client.emit('error', message);
    }
}
