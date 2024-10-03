import {
    IsDateString,
    IsEmail,
    IsIn,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class ApplicantDataBodyDto {
    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    middleName: string;

    @IsIn(['male', 'female'])
    gender: string;

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
