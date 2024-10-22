import { HttpException, HttpStatus } from '@nestjs/common';

export class StageNotFoundException extends HttpException {
    constructor() {
        super('Stage not found', HttpStatus.NOT_FOUND);
    }
}
