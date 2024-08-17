import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../types/user-roles.enum';

export class CreateUserBodyDto extends BodyDtoAbstract {
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
