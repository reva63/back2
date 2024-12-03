import {
    Injectable,
    Inject,
    UnauthorizedException,
    OnModuleInit,
} from '@nestjs/common';
import { ITokensInterface } from '../interfaces/tokens.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { OAuthClass } from '../classes/oauth.class';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IClient } from '../interfaces/client.interface';
import { ICallbackQuery } from '../interfaces/callbackQuery.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IDiscoveryDocument } from '../interfaces/DiscoveryDocument.interface';
import { IOidcUser } from '../interfaces/userResponse.interface';
import { TokensService } from '../../tokens/services/tokens.service';
import { StoreUserBodyDto } from '../../users/dto/store/storeUser.body.dto';
import { ProfilesService } from 'src/business/profiles/services/profiles.service';
import { StoreProfileBodyDto } from 'src/business/profiles/dto/store/storeProfile.body.dto';

@Injectable()
export class AuthService implements OnModuleInit {
    private oauth: OAuthClass;
    async onModuleInit() {
        await this.setOAuthClass();
    }

    constructor(
        private readonly usersService: UsersService,
        private readonly profilesService: ProfilesService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly tokenService: TokensService,
    ) {}

    async setOAuthClass(): Promise<OAuthClass> {
        const redirectUri = this.configService.get<string>('OIDC_REDIRECT');
        const client: IClient = {
            id: this.configService.get<string>(`OIDC_CLIENT_ID`),
            secret: this.configService.get<string>(`OIDC_CLIENT_SECRET`),
        };
        if (!client) {
            return null;
        }

        const issuer = this.configService.get<string>(`OIDC_ISSUER`);
        const discoveryDocument = await this.getDiscoveryDocument(issuer);
        this.oauth = new OAuthClass(client, redirectUri, discoveryDocument);
    }

    async getDiscoveryDocument(issuer: string): Promise<IDiscoveryDocument> {
        return (
            await firstValueFrom(
                this.httpService
                    .get<IDiscoveryDocument>(
                        `${issuer}/.well-known/openid-configuration`,
                    )
                    .pipe(
                        catchError((error: AxiosError) => {
                            throw new UnauthorizedException(
                                error.response.data,
                            );
                        }),
                    ),
            )
        ).data;
    }

    public async getAuthorizationUrl(): Promise<string> {
        const [url, state] = this.oauth.authorizationUrl;

        this.cacheManager.set(state, true, 120 * 1000);
        return url;
    }

    public async getUserData<T extends Record<string, any>>(
        cbQuery: ICallbackQuery,
    ): Promise<T> {
        const { code, state } = cbQuery;
        const accessToken = await this.getAccessToken(code, state);
        const userData = await firstValueFrom(
            this.httpService
                .get<T>(this.oauth.dataUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw new UnauthorizedException(error.response.data);
                    }),
                ),
        );
        return userData.data;
    }

    public async login(userData: IOidcUser): Promise<ITokensInterface> {
        let user = await this.usersService.show({
            params: { user: userData.user_id },
        });
        if (!user) {
            const creatable = { id: userData.user_id } as StoreUserBodyDto;
            user = await this.usersService.store({ body: creatable });
            const profileCreatable = {
                firstName: userData.user_name,
                lastName: userData.user_surname,
                email: userData.user_email,
                phone: userData.user_phone,
            } as StoreProfileBodyDto;
            await this.profilesService.store({
                params: { user: user.id },
                body: profileCreatable,
            });
        }

        const payload = this.generatePayload(user);
        const tokens = this.tokenService.generateTokens(payload);
        this.tokenService.saveToken(user, tokens.refreshToken);

        return tokens;
    }

    public async refreshAccessToken(
        refreshToken: string,
    ): Promise<ITokensInterface> {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const userData = this.tokenService.validateToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.show({
            params: { user: userData.id },
        });
        const payload = this.generatePayload(user);
        const tokens = this.tokenService.generateTokens(payload);

        await this.tokenService.saveToken(user, tokens.refreshToken);
        return tokens;
    }

    public async logout(refreshToken: string): Promise<void> {
        await this.tokenService.removeToken(refreshToken);
    }

    private async getAccessToken(code: string, state: string): Promise<string> {
        const sameState = await this.cacheManager.get<string>(state);

        if (!sameState) {
            throw new UnauthorizedException('Corrupted state');
        }

        return await this.oauth.getToken(code);
    }

    private generatePayload(user: UserEntity) {
        return { id: user.id };
    }
}
