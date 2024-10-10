import { ApplicantDataBodyDto } from 'src/business/applications/dto/applicantData.body.dto';
import { FileType } from '../../../types/file.type';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';
import { IAttributeDto } from 'src/core/abstract/base/dto/attribute.dto.interface';

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
    preview?: string;
    removeParagraphs?: number[];

    // certificates
    key?: string;
    name?: string;

    // categories
    direction?: number;

    // profiles
    firstName?: string;
    lastName?: string;
    middleName?: string | null;
    gender?: 'male' | 'female';
    dateOfBirth?: Date;
    citizenship?: string;
    country?: string;
    region?: string;
    city?: string;
    email?: string;
    phone?: string;

    // attributes
    upsertAttributes?: IAttributeDto[];
    removeAttributes?: number[];
}
