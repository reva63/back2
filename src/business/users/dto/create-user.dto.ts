import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';
import { UserRoles } from '../enums/user-roles.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends BodyDtoAbstract {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRoles)
    @IsNotEmpty()
    role: UserRoles;
}
