import { IsString } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/posts/dto/bodyDto.abstract';

export class CreatePostBodyDto extends BodyDtoAbstract {
    @IsString()
    title: string;

    @IsString()
    content: string;
}
