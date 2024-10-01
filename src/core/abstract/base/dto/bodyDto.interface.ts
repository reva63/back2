import { UserRoles } from 'src/business/users/types/userRoles.enum';

export interface IBodyDto {
    //user
    email?: string;
    role?: UserRoles;
}
