// Fields from rsv
export interface IOidcUser {
    readonly user_id: number;
    readonly user_name: string;
    readonly user_surname: string;
    readonly user_email: string; // can be '', even if exists in rsv profile
    readonly user_phone: string;
    readonly roles: string[];
    readonly role: string;
    readonly sub: string;
}
