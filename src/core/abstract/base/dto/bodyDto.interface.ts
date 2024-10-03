import { ApplicantDataBodyDto } from 'src/business/applications/dto/applicantData.body.dto';
import { FileType } from '../../../types/file.type';

export interface IBodyDto {
    // common
    files?: FileType[];
    categories?: number[];
    contest?: number;
    certificates?: number[];

    // posts
    title?: string;
    text?: string;

    // stages
    startDate?: Date;
    endDate?: Date;

    // applications
    applicantData?: ApplicantDataBodyDto;
    applicantSocials?: { [key: string]: string };
}
