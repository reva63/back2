import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSessions } from './entities/authSessions.entity';
import { v4 } from 'uuid';
import { UserRoles } from '../permissions/types/userRoles.enum';
import { TokensInterface } from './interfaces/tokens.interface';
import { SessionPayloadInterface } from './interfaces/sessionPayload.interface';
import { RefreshTokenPayloadInterface } from './interfaces/refreshTokenPayload.interface';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthService {
    private readonly accessTokenExpiration = '5m';
    private readonly refreshTokenExpiration = '30d';

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(AuthSessions)
        private readonly sessionsRepository: Repository<AuthSessions>,
    ) {}

    async yandexAuth(
        email: string,
        payload: SessionPayloadInterface,
        device_id: string | null,
    ) {
        const user =
            (await this.usersService.show({ body: {} })) ||
            (await this.createUser(email));
        return this.generateTokens(user, payload, device_id);
    }

    private async createUser(email: string): Promise<UserEntity> {
        try {
            return await this.usersService.store({});
        } catch {
            throw new BadRequestException('Unable to create user');
        }
    }

    private async generateTokens(
        user: UserEntity,
        payload: SessionPayloadInterface,
        device_id: string | null,
    ): Promise<TokensInterface> {
        const accessToken = this.createAccessToken(user);

        // if device_id is exist (passed as a cookie) - just update session
        const { refreshToken, exp, newDeviceId } = device_id
            ? await this.updateExistingSession(device_id, payload, user)
            : await this.createNewSession(payload, user);

        return {
            accessToken,
            refreshToken: { token: refreshToken, exp },
            device_id: newDeviceId,
        };
    }

    private createAccessToken(user: UserEntity): string {
        return (
            'Bearer ' +
            this.jwtService.sign(
                {
                    id: user.id,
                },
                { expiresIn: this.accessTokenExpiration },
            )
        );
    }

    private async createNewSession(
        payload: SessionPayloadInterface,
        user: UserEntity,
    ): Promise<RefreshTokenPayloadInterface> {
        try {
            const refreshToken = this.jwtService.sign(
                { device_name: payload.device_name },
                { expiresIn: this.refreshTokenExpiration },
            );
            const { exp } = this.jwtService.decode(refreshToken) as {
                exp: number;
            };
            const deviceId = v4();

            // delete existing sessions for the same device name
            await this.deleteExistingSessions(payload.device_name);

            const refreshTokenPayload = this.sessionsRepository.create({
                device_id: deviceId,
                issued_at: exp,
                ...payload,
                user,
            });
            await this.sessionsRepository.save(refreshTokenPayload);

            return { refreshToken, exp, newDeviceId: deviceId };
        } catch {
            throw new BadRequestException('Unable to create session');
        }
    }

    private async deleteExistingSessions(deviceName: string): Promise<void> {
        const sameDeviceNames = await this.sessionsRepository.find({
            where: { device_name: deviceName },
        });

        if (sameDeviceNames.length > 0) {
            await Promise.all(
                sameDeviceNames.map((device) =>
                    this.sessionsRepository.delete({
                        device_id: device.device_id,
                    }),
                ),
            );
        }
    }

    private async updateExistingSession(
        device_id: string,
        payload: SessionPayloadInterface,
        user: UserEntity,
    ): Promise<RefreshTokenPayloadInterface> {
        const refreshToken = this.jwtService.sign(
            { device_name: payload.device_name },
            { expiresIn: this.refreshTokenExpiration },
        );
        const { exp } = this.jwtService.decode(refreshToken) as { exp: number };

        const refreshTokenPayload = await this.sessionsRepository.findOne({
            where: { device_id },
        });
        if (!refreshTokenPayload) {
            throw new NotFoundException('Session not found');
        }

        try {
            await this.sessionsRepository.update(
                { device_id },
                { ...payload, issued_at: exp, user },
            );
        } catch {
            throw new BadRequestException('Unable to update session');
        }

        return { refreshToken, exp, newDeviceId: device_id };
    }
}
