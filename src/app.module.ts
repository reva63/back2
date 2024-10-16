import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from './business/business.module';
import { getTypeOrmConfig } from './core/configs/typeOrm.config';
import { CoreModule } from './core/core.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(getTypeOrmConfig()),
        BusinessModule,
        CoreModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
