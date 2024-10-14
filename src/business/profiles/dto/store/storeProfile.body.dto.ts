import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ProfileAttributeBodyDto } from '../profileAttribute.body.dto';
import {
    ArrayMinSize,
    IsDateString,
    IsEmail,
    IsIn,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StoreProfileBodyDto implements IBodyDto {
    // TODO: remove after authentication comes
    @IsNumber()
    user: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsOptional()
    middleName: string | null;

    @IsIn(['male', 'female'])
    gender: 'male' | 'female';

    @IsDateString()
    dateOfBirth: Date;

    @IsString()
    citizenship: string;

    @IsString()
    country: string;

    @IsString()
    region: string;

    @IsString()
    city: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;

    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProfileAttributeBodyDto)
    @IsOptional()
    upsertAttributes: ProfileAttributeBodyDto[];
}
