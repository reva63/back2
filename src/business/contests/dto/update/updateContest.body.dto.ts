import { Optional } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';

export class UpdateContestBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    @Optional()
    areViewersAllowed: boolean;

    @IsBoolean()
    @Optional()
    isOnline: boolean;
}
