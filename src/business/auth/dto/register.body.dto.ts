import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { CitizenshipTypes } from 'src/core/types/citizenshipTypes.enum';

export class RegisterBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    middleName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ enum: ['male', 'female'] })
    @IsNotEmpty()
    @IsEnum(['male', 'female'])
    gender: 'male' | 'female';

    @ApiProperty({ example: '1990-01-01' })
    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty({ enum: CitizenshipTypes })
    @IsNotEmpty()
    @IsEnum(CitizenshipTypes)
    citizenship: CitizenshipTypes;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    region: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;
}
