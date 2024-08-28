import { Role } from '../entities/role.entity';

export interface UserResponse {
    id: string;
    email: string;
    roles: Role[];
}
