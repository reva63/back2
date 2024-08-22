import { IsNumberString } from 'class-validator';
import { ParamsDtoAbstract } from 'src/core/abstract/base/posts/dto/paramsDto.abstract';

export class GetPostByIdParamsDto extends ParamsDtoAbstract {
    @IsNumberString()
    id: number;
}
