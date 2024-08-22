import {
    IsBoolean,
    IsDate,
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class ContestStageDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    sortOrder: number;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    competitionType: string;

    @IsBoolean()
    @IsNotEmpty()
    isMediaNecessary: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isRatingAssumed: boolean;

    @IsDate()
    @Optional()
    ratingStartDate?: Date;

    @IsDate()
    @Optional()
    ratingEndDate?: Date;

    @IsInt()
    @IsNotEmpty()
    maximumParticipators: number;
}
