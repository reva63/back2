import { BodyDtoAbstract } from 'src/core/abstract/base/users/dto/bodyDto.abstract';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserBodyDto extends BodyDtoAbstract {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;
}
