import { IsBoolean, IsNumber, IsUUID } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/applications/dto/bodyDto.abstract';

export class CreateApplicationBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    isAsParticipant: boolean;

    @IsNumber()
    contestId: number;

    @IsUUID()
    userId: string;
}
