export interface IQueryDto {
    page?: number;
    limit?: number;
    sort?: 'desc' | 'asc';
    user?: number;
}
