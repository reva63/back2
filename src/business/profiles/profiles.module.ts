import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileAttributeEntity } from './entities/profileAttributes.entity';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesService } from './services/profiles.service';
import { ProfileAttributesService } from './services/profileAttributes.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity, ProfileAttributeEntity]),
        ConfigModule,
    ],
    controllers: [ProfilesController],
    providers: [ProfilesService, ProfileAttributesService],
    exports: [ProfilesService, ProfileAttributesService],
})
export class ProfilesModule {}
