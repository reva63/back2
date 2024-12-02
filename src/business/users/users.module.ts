import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAttributeEntity } from './entities/userAttribute.entity';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/core/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserAttributeEntity]),
        JwtModule.registerAsync(getJwtConfig()),
        ConfigModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
