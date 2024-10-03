import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsController } from './controllers/applications.controller';
import { UsersModule } from '../users/users.module';
import { ContestsModule } from '../contests/contests.module';
import { ApplicationEntity } from './entities/application.entity';
import { ApplicationAttributeEntity } from './entities/applicationAttribute.entity';
import { ApplicationAttachmentEntity } from './entities/applicationAttachment.entity';
import { ApplicationAttributesService } from './services/applicationAttributes.service';

@Module({
    imports: [
        UsersModule,
        ContestsModule,
        TypeOrmModule.forFeature([
            ApplicationEntity,
            ApplicationAttributeEntity,
            ApplicationAttachmentEntity,
        ]),
    ],
    controllers: [ApplicationsController],
    providers: [ApplicationsService, ApplicationAttributesService],
    exports: [ApplicationsService],
})
export class ApplicationsModule {}
