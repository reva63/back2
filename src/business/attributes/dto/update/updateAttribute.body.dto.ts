import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';

export class UpdateAttributeBodyDto implements IBodyDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ enum: AttributeTypes })
    @IsOptional()
    @IsEnum(AttributeTypes)
    type?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    comment?: string;
}
