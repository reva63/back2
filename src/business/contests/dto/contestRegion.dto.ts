import { IsPostalCode, IsString } from 'class-validator';

export class ContestRegionDto {
    @IsString()
    country: string;

    @IsString()
    region: string;

    @IsPostalCode('RU')
    postalCode: number;
}
