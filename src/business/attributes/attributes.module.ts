import { Module } from '@nestjs/common';
import { AttributesController } from './controllers/attributes.controller';
import { AttributesService } from './services/attributes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from './entities/attribute.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeEntity])],
    controllers: [AttributesController],
    providers: [AttributesService],
})
export class AttributesModule {}
