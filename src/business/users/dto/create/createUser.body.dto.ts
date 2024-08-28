import { BodyDtoAbstract } from 'src/core/abstract/base/users/dto/bodyDto.abstract';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsEnum,
    IsString,
} from 'class-validator';
import { UserRoles } from '../../types/userRoles.enum';

export class CreateUserBodyDto extends BodyDtoAbstract {
    @IsEmail()
    @IsString()
    email: string;

    @IsEnum(UserRoles, { each: true })
    @ArrayMinSize(1)
    @IsArray()
    roles: UserRoles[];
}
