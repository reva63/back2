import { Module } from '@nestjs/common';
import { TokensService } from './services/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/core/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([TokenEntity]),
        ConfigModule,
        JwtModule.registerAsync(getJwtConfig()),
    ],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {}
