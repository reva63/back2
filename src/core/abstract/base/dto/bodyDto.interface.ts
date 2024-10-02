import { UserRoles } from 'src/business/users/types/userRoles.enum';
import { FileType } from '../../../types/file.type';

export interface IBodyDto {
    // user
    email?: string;
    role?: UserRoles;

    // posts
    title?: string;
    text?: string;
    files?: FileType[];
}
