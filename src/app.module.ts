import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';

@Module({
    imports: [BusinessModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
