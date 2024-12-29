import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/business/users/entities/user.entity';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokensRepository: Repository<TokenEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.getOrThrow<string>(
                'JWT_ACCESS_EXPIRATION',
            ),
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.getOrThrow<string>(
                'JWT_REFRESH_EXPIRATION',
            ),
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: this.configService.getOrThrow<string>('JWT_SECRET'),
            });
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user: UserEntity, refreshToken: string) {
        const tokenData = await this.tokensRepository.findOne({
            where: { user },
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return this.tokensRepository.save(tokenData);
        }
        const token = await this.tokensRepository.insert({
            user,
            refreshToken,
        });
        return token;
    }

    async removeToken(refreshToken) {
        return await this.tokensRepository.delete({
            refreshToken,
        });
    }

    async findToken(refreshToken) {
        return await this.tokensRepository.findOne({
            where: { refreshToken },
        });
    }
}
