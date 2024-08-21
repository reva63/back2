import { BodyDtoAbstract } from 'src/core/abstract/base/dto/bodyDto.abstract';
import { ContestStage } from '../../entities/contestStage.entity';
import { IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ContestStageDto } from '../contestStage.dto';
import { ContestRegionDto } from '../contestRegion.dto';

export class CreateContestBodyDto extends BodyDtoAbstract {
    @IsBoolean()
    areViewersAllowed: boolean;

    @IsBoolean()
    isOnline: boolean;

    @ValidateNested({ each: true })
    @Type(() => ContestStageDto)
    stages: ContestStage[];

    @ValidateNested({ each: true })
    @Type(() => ContestRegionDto)
    regions: ContestRegionDto[];
}
