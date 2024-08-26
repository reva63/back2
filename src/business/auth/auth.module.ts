import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSessions } from './entities/authSessions.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { YandexGuard } from './guard/yandex.guard';
import { YandexStrategy } from './strategies/yandex.strategy';
import { getJwtConfig } from 'src/core/configs/jwt.config';

@Module({
    imports: [
        HttpModule,
        UsersModule,
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync(getJwtConfig()),
        TypeOrmModule.forFeature([AuthSessions]),
    ],
    controllers: [AuthController],
    providers: [YandexGuard, YandexStrategy, AuthService],
})
export class AuthModule {}
