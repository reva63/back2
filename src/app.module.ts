import { Module, ValidationPipe } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT!,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true,
        }),
        BusinessModule,
    ],
    controllers: [],
    providers: [
        {
            provide: 'APP_PIPE',
            useFactory: () =>
                new ValidationPipe({
                    transform: true,
                    validateCustomDecorators: true,
                    whitelist: true,
                    stopAtFirstError: true,
                }),
        },
    ],
})
export class AppModule {}
