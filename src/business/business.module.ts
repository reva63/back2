import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ContestsModule } from './contests/contests.module';
import { RatingsModule } from './ratings/ratings.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ApplicationsModule,
        CertificatesModule,
        ContestsModule,
        PostsModule,
        RatingsModule,
        UsersModule,
        AuthModule,
        ScheduleModule.forRoot(),
    ],
})
export class BusinessModule {}
