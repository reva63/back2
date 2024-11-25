import { Module } from '@nestjs/common';
import { BannersController } from './cotrollers/banners.controller';
import { BannersService } from './services/banners.service';
import { BannerEntity } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([BannerEntity]), UsersModule],
    controllers: [BannersController],
    providers: [BannersService],
})
export class BannersModule {}
