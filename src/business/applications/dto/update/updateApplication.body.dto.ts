import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';
import { ApplicationReviewStatus } from '../../types/applicationReviewStatus.enum';

export class UpdateApplicationBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    @IsOptional()
    isAsParticipant: boolean;

    @IsEnum(ApplicationReviewStatus)
    @IsOptional()
    reviewStatus: ApplicationReviewStatus;
}
