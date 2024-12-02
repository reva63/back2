import { Get, Req, Res, Query, Controller, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../services/auth.service';
import { ITokensInterface } from 'src/business/auth/interfaces/tokens.interface';
import { ConfigService } from '@nestjs/config';
import { IOidcUser } from '../interfaces/userResponse.interface';
import { CallbackQueryDto } from '../dto/callback-query.dto';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Get('login')
    public async rsvLogin(@Res() res: FastifyReply): Promise<FastifyReply> {
        return this.startRedirect(res);
    }

    @Get('rsv')
    public async rsvCallback(
        @Query() cbQuery: CallbackQueryDto,
        @Res() res: FastifyReply,
    ): Promise<FastifyReply> {
        const userData = await this.authService.getUserData<IOidcUser>(cbQuery);
        const localTokens = await this.authService.login(userData);
        return this.setRefreshCookie(res, localTokens);
    }

    @Get('refreshAccessToken')
    public async refreshAccessToken(
        @Req() req: FastifyRequest,
        @Res() res: FastifyReply,
    ): Promise<FastifyReply> {
        const { refreshToken } = req.cookies;
        const tokens = await this.authService.refreshAccessToken(refreshToken);
        return this.setRefreshCookie(res, tokens);
    }

    private async startRedirect(res: FastifyReply): Promise<FastifyReply> {
        //await this.authService.setOAuthClass();
        return res
            .status(HttpStatus.TEMPORARY_REDIRECT)
            .redirect(await this.authService.getAuthorizationUrl());
    }

    private async setRefreshCookie(
        res: FastifyReply,
        tokens: ITokensInterface,
    ): Promise<FastifyReply> {
        return res
            .setCookie('refreshToken', tokens.refreshToken, {
                secure: true,
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days
            })
            .status(HttpStatus.CREATED)
            .send({
                accessToken: tokens.accessToken,
            });
    }

    @Get('logout')
    public async logout(
        @Req() req: FastifyRequest,
        @Res() res: FastifyReply,
    ): Promise<void> {
        const { refreshToken } = req.cookies;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken', { path: '/' })
            .header('Content-Type', 'application/json')
            .status(HttpStatus.PERMANENT_REDIRECT)
            .redirect(this.configService.getOrThrow<string>('HOME_PAGE'));
    }
}
