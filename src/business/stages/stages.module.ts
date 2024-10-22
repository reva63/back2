import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEntity } from './entities/stage.entity';
import { StagesController } from './controllers/stages.controller';
import { StagesService } from './services/stages.service';

@Module({
    imports: [TypeOrmModule.forFeature([StageEntity])],
    providers: [StagesService],
    controllers: [StagesController],
    exports: [StagesService],
})
export class StagesModule {}
