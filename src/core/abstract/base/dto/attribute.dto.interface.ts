import { ProfileAttributeTypes } from '../../../types/profileAttributeTypes.enum';

export class IAttributeDto {
    id?: number;
    type?: ProfileAttributeTypes;
    name?: string;
    value?: string;
}
