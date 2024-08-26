import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from './business/business.module';
import { getTypeOrmConfig } from './core/configs/typeOrm.config';

@Module({
    imports: [TypeOrmModule.forRootAsync(getTypeOrmConfig()), BusinessModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
