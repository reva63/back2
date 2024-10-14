import { Type } from 'class-transformer';
import {
    IsArray,
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ProfileAttributeBodyDto } from '../profileAttribute.body.dto';

export class UpdateProfileBodyDto implements IBodyDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    middleName: string | null;

    @IsString()
    @IsOptional()
    citizenship: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    region: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @ValidateNested({ each: true })
    @Type(() => ProfileAttributeBodyDto)
    @IsOptional()
    upsertAttributes: ProfileAttributeBodyDto[];

    @IsNumber({}, { each: true })
    @IsArray()
    @IsOptional()
    removeAttributes: number[];
}
