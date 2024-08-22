import { IsBoolean, IsOptional } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';

export class UpdateContestBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    @IsOptional()
    areViewersAllowed: boolean;

    @IsBoolean()
    @IsOptional()
    isOnline: boolean;
}