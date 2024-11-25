import { HttpException, HttpStatus } from '@nestjs/common';

export class BannerNotFoundException extends HttpException {
    constructor() {
        super('Banner not found', HttpStatus.NOT_FOUND);
    }
}
