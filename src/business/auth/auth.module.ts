import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TokensModule } from '../tokens/tokens.module';

@Module({
    imports: [
        HttpModule,
        UsersModule,
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
