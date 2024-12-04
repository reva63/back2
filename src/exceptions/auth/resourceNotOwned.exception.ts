import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotOwnedException extends HttpException {
    constructor() {
        super('Resource is not owned by current user', HttpStatus.UNAUTHORIZED);
    }
}
