import {
    IsDateString,
    IsEmail,
    IsIn,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { IProfile } from 'src/core/abstract/interfaces/profile.interface';

export class ProfileDataBodyDto implements IProfile {
    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    middleName: string;

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
}
