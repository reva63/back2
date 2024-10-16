import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IAttribute } from 'src/core/abstract/interfaces/attribute.interface';
import { AttributeTypes } from 'src/core/types/attributeTypes.enum';

export class ProfileAttributeBodyDto implements IAttribute {
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
