export interface TokensInterface {
    accessToken: string;
    refreshToken: {
        token: string;
        exp: number;
    };
    device_id: string;
}
