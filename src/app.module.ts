import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './core/configs/typeOrm.config';

@Module({
    imports: [TypeOrmModule.forRootAsync(getTypeOrmConfig()), BusinessModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
