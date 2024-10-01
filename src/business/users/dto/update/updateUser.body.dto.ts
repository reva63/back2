import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';

export class UpdateUserBodyDto extends BodyDtoAbstract {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;
}
