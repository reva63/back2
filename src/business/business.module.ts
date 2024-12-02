import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ContestsModule } from './contests/contests.module';
import { RatingsModule } from './ratings/ratings.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BlocksModule } from './blocks/blocks.module';
import { StagesModule } from './stages/stages.module';
import { CategoriesModule } from './categories/categories.module';
import { DirectionsModule } from './directions/directions.module';
import { ProfilesModule } from './profiles/profiles.module';
import { BannersModule } from './banners/banners.module';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
    imports: [
        ApplicationsModule,
        CertificatesModule,
        ContestsModule,
        PostsModule,
        RatingsModule,
        UsersModule,
        AuthModule,
        PermissionsModule,
        ChatsModule,
        MessagesModule,
        BlocksModule,
        StagesModule,
        CategoriesModule,
        NotificationsModule,
        ScheduleModule.forRoot(),
        DirectionsModule,
        ProfilesModule,
        BannersModule,
        SeasonsModule,
    ],
})
export class BusinessModule {}
