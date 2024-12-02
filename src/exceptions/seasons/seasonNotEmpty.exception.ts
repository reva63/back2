import { HttpException, HttpStatus } from '@nestjs/common';

export class SeasonNotEmptyException extends HttpException {
    constructor() {
        super('Season not empty', HttpStatus.BAD_REQUEST);
    }
}
