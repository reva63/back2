export interface IQueryDto {
    page?: number;
    limit?: number;
    sort?: 'desc' | 'asc';
    user?: number;
    operator?: number | null;
    chat?: number;
    roles?: string[];
}
