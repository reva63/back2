import { SocialTypes } from 'src/core/types/socialTypes.enum';

export interface ISocial {
    id?: number;
    type?: SocialTypes;
    link?: string;
}
