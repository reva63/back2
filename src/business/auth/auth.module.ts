import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TokensModule } from '../tokens/tokens.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/core/configs/jwt.config';

@Module({
    imports: [
        HttpModule,
        UsersModule,
        ProfilesModule,
        ConfigModule,
        PassportModule,
        CacheModule.register(),
        TokensModule,

    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
