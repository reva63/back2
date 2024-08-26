export interface RefreshTokenPayloadInterface {
    refreshToken: string;
    exp: number;
    newDeviceId: string;
}
