import { AttributeTypes } from 'src/core/types/attributeTypes.enum';

export interface IAttributeDto {
    id?: number;
    type?: AttributeTypes;
    name?: string;
    value?: string;
}
