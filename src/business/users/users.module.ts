import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAttributeEntity } from './entities/userAttribute.entity';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/core/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AddressEntity } from './entities/address.entity';
import { PassportEntity } from './entities/passport.entity';
import { SocialEntity } from './entities/social.entity';
import { ProfileEntity } from './entities/profile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserAttributeEntity,
            ProfileEntity,
            AddressEntity,
            PassportEntity,
            SocialEntity,
        ]),
        JwtModule.registerAsync(getJwtConfig()),
        ConfigModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
