import { UserRoles } from '../types/user-roles.enum';

export interface UserResponse {
    id: number;
    email: string;
    role: UserRoles;
}
