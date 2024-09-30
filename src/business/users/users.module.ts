import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMetaValue } from './entities/userMetaValue.entity';
import { UserMetaAttribute } from './entities/userMetaAttribute.entity';
import { Role } from './entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Role,
            UserMetaAttribute,
            UserMetaValue,
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
