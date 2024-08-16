import { UserRoles } from '../enums/user-roles.enum';

export interface UserResponse {
    id: number;
    email: string;
    role: UserRoles;
}
