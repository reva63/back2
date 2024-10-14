import { IsEnum, IsUrl } from 'class-validator';
import { ISocial } from 'src/core/abstract/interfaces/social.interface';
import { SocialTypes } from 'src/core/types/socialTypes.enum';

export class SocialDataBodyDto implements ISocial {
    @IsEnum(SocialTypes)
    type: SocialTypes;

    @IsUrl()
    link: string;
}
