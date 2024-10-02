import {
    Get,
    Req,
    Res,
    Query,
    UseGuards,
    Controller,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, mergeMap } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { YandexGuard } from './guard/yandex.guard';
import { handleTimeoutAndErrors } from './common/helpers/timeout-error.helper';
import { SessionPayload } from './common/decorators/rt-creation.decorator';
import { Cookie } from './common/decorators/cookie.decorator';
import { SessionPayloadInterface } from 'src/business/auth/interfaces/sessionPayload.interface';
import { TokensInterface } from 'src/business/auth/interfaces/tokens.interface';

const REFRESH_TOKEN = 'refreshtoken';
const DEVICE_ID = 'deviceid';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly HttpService: HttpService,
        private readonly authService: AuthService,
    ) {}

    @Get('yandex')
    @UseGuards(YandexGuard)
    yandexAuth() {}

    @Get('yandex/callback')
    @UseGuards(YandexGuard)
    yandexAuthCallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const token = req.user['accessToken'];
        res.status(HttpStatus.TEMPORARY_REDIRECT).redirect(
            `http://localhost:6969/api/auth/success-yandex?token=${token}`,
        );
    }

    // just test variant to get authed JWT token
    @Get('success-yandex')
    successYandex(
        @Query('token') token: string,
        @Res() res: FastifyReply,
        @SessionPayload() payload: SessionPayloadInterface,
        @Cookie(DEVICE_ID) device_id: string,
    ) {
        return this.HttpService.get(
            `https://login.yandex.ru/info?format=json&oauth_token=${token}`,
        ).pipe(
            mergeMap(({ data }) =>
                this.authService.yandexAuth(
                    data.default_email,
                    payload,
                    device_id,
                ),
            ),
            map((data) => this.setRefreshTokenToCookies(data, res)),
            handleTimeoutAndErrors(),
        );
    }

    private setRefreshTokenToCookies(
        tokens: TokensInterface,
        res: FastifyReply,
    ) {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.setCookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp * 1000),
            secure: true,
            path: '/',
        });
        res.setCookie(DEVICE_ID, tokens.device_id, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // live 10 years from now
            secure: true,
            path: '/',
        });
        res.status(HttpStatus.CREATED).send({
            accessToken: tokens.accessToken,
        });
    }
}
