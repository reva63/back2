import { BadRequestException, HttpStatus } from '@nestjs/common';

export class SpecialAttributeException extends BadRequestException {
    constructor() {
        super('Special attributes cannot be created or modified');
    }
}
