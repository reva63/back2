import { AttributeTypes } from 'src/core/types/attributeTypes.enum';

export interface IAttribute {
    id?: number;
    type?: AttributeTypes;
    name?: string;
    value?: string;
}
