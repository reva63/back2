import { AuthorizationCode } from 'simple-oauth2';
import { IAuthParams } from '../interfaces/authParams.interface';
import { IClient } from '../interfaces/client.interface';
import { IProvider } from '../interfaces/provider.interface';
import { randomBytes } from 'crypto';
import { IDiscoveryDocument } from '../interfaces/DiscoveryDocument.interface';

export class OAuthClass {
    private readonly code: AuthorizationCode;
    private readonly authorization: IAuthParams;
    readonly userDataUrl: string;

    constructor(
        private readonly client: IClient,
        private readonly redirectUrl: string,
        private readonly discoveryDocument: IDiscoveryDocument,
    ) {
        const authorizationEndpoint = new URL(
            discoveryDocument.authorization_endpoint,
        );
        const tokenEndpoint = new URL(discoveryDocument.token_endpoint);
        const oidcProvider: IProvider = {
            authorizeHost: authorizationEndpoint.origin,
            authorizePath: authorizationEndpoint.pathname,
            tokenHost: tokenEndpoint.origin,
            tokenPath: tokenEndpoint.pathname,
        };
        this.code = new AuthorizationCode({
            client,
            auth: oidcProvider,
        });
        this.authorization = OAuthClass.genAuthorization(redirectUrl);
        this.userDataUrl = discoveryDocument.userinfo_endpoint;
    }

    public get dataUrl(): string {
        return this.userDataUrl;
    }

    public get authorizationUrl(): [string, string] {
        const state = randomBytes(16).toString('hex');
        return [
            this.code.authorizeURL({ ...this.authorization, state }),
            state,
        ];
    }

    private static genAuthorization(redirect_uri: string): IAuthParams {
        return {
            redirect_uri,
            scope: ['openid', 'profile'],
        };
    }

    public async getToken(code: string): Promise<string> {
        const result = await this.code.getToken({
            code,
            redirect_uri: this.authorization.redirect_uri,
            scope: this.authorization.scope,
        });
        return result.token.access_token as string;
    }
}
