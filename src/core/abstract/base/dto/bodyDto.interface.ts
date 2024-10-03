import { FileType } from '../../../types/file.type';

export interface IBodyDto {
    // posts
    title?: string;
    text?: string;
    files?: FileType[];

    // stages
    startDate?: Date;
    endDate?: Date;
    contest?: number;
    certificates?: number[];
}
