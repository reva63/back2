import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IAttributeDto } from 'src/core/abstract/base/dto/attribute.dto.interface';
import { AttributeTypes } from 'src/core/types/profileAttributeTypes.enum';

export class ProfileAttributeBodyDto implements IAttributeDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsEnum(AttributeTypes)
    type: AttributeTypes;

    @IsString()
    name: string;

    @IsString()
    value: string;
}
