export interface IProfile {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string | null;
    gender?: 'male' | 'female';
    dateOfBirth?: Date;
    citizenship?: string;
    country?: string;
    region?: string;
    city?: string;
    email?: string;
    phone?: string;
}
