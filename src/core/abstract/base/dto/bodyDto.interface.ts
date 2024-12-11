import { IFile } from '../../interfaces/file.interface';
import { IProfile } from '../../interfaces/profile.interface';
import { ISocial } from '../../interfaces/social.interface';
import { IParagraph } from '../../interfaces/paragraph.interface';
import { IAttribute } from '../../interfaces/attribute.interface';

export interface IBodyDto {
    // common
    files?: IFile[];
    categories?: number[];
    contest?: number;
    certificates?: number[];
    title?: string;
    text?: string;

    // stages
    startDate?: Date;
    endDate?: Date;
    user?: number;
    category?: number;
    stage?: number;
    certificateTemplate?: Buffer;

    // applications
    profileData?: IProfile;
    socialData?: ISocial[];
    directions?: number[];

    // contests
    description?: string;
    upsertParagraphs?: IParagraph[];
    preview?: string;
    removeParagraphs?: number[];
    season?: number;

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
    upsertAttributes?: IAttribute[];
    removeAttributes?: number[];

    // notifications
    reciever?: number;
    type?: string;
    content?: string;

    // users
    id?: number;

    // seasons
    number?: number;
    year?: number;
}
