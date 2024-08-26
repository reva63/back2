import { UserRoles } from '../types/user-roles.enum';

export interface UserResponse {
    id: string;
    email: string;
    role: UserRoles;
}
