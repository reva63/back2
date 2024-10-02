import { FileType } from '../../../types/file.type';
export interface IBodyDto {
    // posts
    title?: string;
    text?: string;
    files?: FileType[];
}
