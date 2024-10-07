import { ApplicantDataBodyDto } from 'src/business/applications/dto/applicantData.body.dto';
import { FileType } from '../../../types/file.type';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';

export interface IBodyDto {
    // common
    files?: FileType[];
    categories?: number[];
    contest?: number;
    certificates?: number[];
    title?: string;

    // posts
    text?: string;

    // stages
    startDate?: Date;
    endDate?: Date;

    // applications
    applicantData?: ApplicantDataBodyDto;
    applicantSocials?: { [key: string]: string };

    // contests
    description?: string;
    upsertParagraphs?: ParagraphDto[];
    removeParagraphs?: number[];

    // certificates
    key?: string;
    name?: string;
}
