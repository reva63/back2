import { IsOptional, IsString } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';

export class UpdatePostBodyDto extends BodyDtoAbstract {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;
}
