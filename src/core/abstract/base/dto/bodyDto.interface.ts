import { FileType } from '../../../types/file.type';
import { ParagraphDto } from 'src/core/paragraphs/dto/paragraph.dto';
import { IAttributeDto } from 'src/core/abstract/base/dto/attribute.dto.interface';
import { IProfile } from '../../interfaces/profile.interface';
import { ISocial } from '../../interfaces/social.interface';

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
    profileData?: IProfile;
    socialData?: ISocial[];

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
    directions?: number[];

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
