import { Controller } from '@nestjs/common';
import { AttributesService } from '../services/attributes.service';

@Controller('attributes')
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}
}
