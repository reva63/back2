import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AttributesService } from '../services/attributes.service';
import { ShowAttributeParamsDto } from '../dto/show/showAttribute.params.dto';
import { UpdateAttributeParamsDto } from '../dto/update/updateAttribute.params.dto';
import { RemoveAttributeParamsDto } from '../dto/remove/removeAttribute.params.dto';
import { AttributeEntity } from '../entities/attribute.entity';
import { StoreAttributeBodyDto } from '../dto/store/storeAttribute.body.dto';
import { UpdateAttributeBodyDto } from '../dto/update/updateAttribute.body.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('attributes')
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}

    @ApiOperation({ summary: 'List all attributes' })
    @ApiResponse({ status: 200, type: [AttributeEntity] })
    @Get()
    async list(): Promise<AttributeEntity[]> {
        return await this.attributesService.list();
    }

    @ApiOperation({ summary: 'Show an attribute' })
    @ApiResponse({ status: 200, type: AttributeEntity })
    @ApiResponse({ status: 404, description: 'Attribute not found' })
    @Get(':attribute')
    async show(
        @Param() params: ShowAttributeParamsDto,
    ): Promise<AttributeEntity> {
        return await this.attributesService.show({ params });
    }

    @ApiOperation({ summary: 'Create an attribute' })
    @ApiResponse({ status: 201, type: AttributeEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    async create(
        @Body() body: StoreAttributeBodyDto,
    ): Promise<void | AttributeEntity> {
        return await this.attributesService.store({ body });
    }

    @ApiOperation({ summary: 'Update an attribute' })
    @ApiResponse({ status: 200, type: AttributeEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Attribute not found' })
    @Patch(':attribute')
    async update(
        @Param() params: UpdateAttributeParamsDto,
        @Body() body: UpdateAttributeBodyDto,
    ): Promise<AttributeEntity> {
        return await this.attributesService.update({ params, body });
    }

    @ApiOperation({ summary: 'Delete an attribute' })
    @ApiResponse({ status: 200, description: 'Attribute deleted' })
    @ApiResponse({ status: 404, description: 'Attribute not found' })
    @Delete(':attribute')
    async remove(@Param() params: RemoveAttributeParamsDto): Promise<void> {
        return await this.attributesService.remove({ params });
    }
}
