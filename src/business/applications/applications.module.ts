import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { UsersModule } from '../users/users.module';
import { ContestsModule } from '../contests/contests.module';

@Module({
    imports: [
        UsersModule,
        ContestsModule,
        TypeOrmModule.forFeature([Application]),
    ],
    controllers: [ApplicationsController],
    providers: [ApplicationsService],
    exports: [ApplicationsService],
})
export class ApplicationsModule {}
