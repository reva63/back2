import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends BodyDtoAbstract {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;
}
