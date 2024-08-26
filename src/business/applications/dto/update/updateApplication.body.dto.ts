import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApplicationReviewStatus } from '../../types/applicationReviewStatus.enum';
import { BodyDtoAbstract } from 'src/core/abstract/base/applications/dto/bodyDto.abstract';

export class UpdateApplicationBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    @IsOptional()
    isAsParticipant: boolean;

    @IsEnum(ApplicationReviewStatus)
    @IsOptional()
    reviewStatus: ApplicationReviewStatus;
}
