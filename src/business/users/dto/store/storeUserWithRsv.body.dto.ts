import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

export class StoreUserWithRsvBodyDto implements IBodyDto {
    @IsNumber()
    @IsNotEmpty()
    rsvId: number;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
