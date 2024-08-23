import { IsBoolean, IsNumberString } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';

export class CreateApplicationBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    isAsParticipant: boolean;

    @IsNumberString()
    contestId: number;
}
