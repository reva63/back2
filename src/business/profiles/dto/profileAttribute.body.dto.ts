import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IAttributeDto } from 'src/core/abstract/base/dto/attribute.dto.interface';
import { ProfileAttributeTypes } from 'src/core/types/profileAttributeTypes.enum';

export class ProfileAttributeBodyDto implements IAttributeDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsEnum(ProfileAttributeTypes)
    type: ProfileAttributeTypes;

    @IsString()
    name: string;

    @IsString()
    value: string;
}
