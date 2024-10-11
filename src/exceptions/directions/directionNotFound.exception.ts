import { HttpException, HttpStatus } from '@nestjs/common';

export class DirectionNotFoundException extends HttpException {
    constructor() {
        super('Direction not found', HttpStatus.NOT_FOUND);
    }
}
