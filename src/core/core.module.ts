import { Module } from '@nestjs/common';
import { S3Module } from './S3/s3.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { GlobalJwtModule } from './jwt/jwt.module';

@Module({
    imports: [
        AttachmentsModule,
        S3Module.forRoot({
            endpoint: process.env.S3CLIENT_ENDPOINT,
            region: process.env.S3CLIENT_REGION,
            credentials: {
                accessKeyId: process.env.S3CLIENT_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3CLIENT_SECRET_ACCESS_KEY,
            },
        }),
        GlobalJwtModule,
    ],
})
export class CoreModule {}
