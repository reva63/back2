import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ContestsModule } from './contests/contests.module';
import { RatingsModule } from './ratings/ratings.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        ApplicationsModule,
        CertificatesModule,
        ContestsModule,
        PostsModule,
        RatingsModule,
        UsersModule,
    ],
})
export class BusinessModule {}
