import { Languages } from '../../../types/languages.enum';

export interface QueryDtoInterface {
    page?: number;
    limit?: number;
    coin?: number;
    tags?: number[];
    lang?: Languages;
    timespan?: 'week' | 'month' | 'year';
    sort?: 'desc' | 'asc';
    search?: string[];
}
