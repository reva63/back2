import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';

export class StoreAttributeBodyDto implements IBodyDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ enum: AttributeTypes })
    @IsEnum(AttributeTypes)
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    comment?: string;
}
