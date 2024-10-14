import { AttributeTypes } from 'src/core/types/profileAttributeTypes.enum';

export interface IAttributeDto {
    id?: number;
    type?: AttributeTypes;
    name?: string;
    value?: string;
}
