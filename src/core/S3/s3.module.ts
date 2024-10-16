import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3ModuleOptions } from './interfaces/s3ModuleOptions.interface';

@Module({})
export class S3Module {
    static forRoot(options: S3ModuleOptions): DynamicModule {
        return {
            module: S3Module,
            global: true,
            providers: [
                {
                    provide: 'S3ModuleOptions',
                    useValue: options,
                },
                S3Service,
            ],
            exports: [S3Service],
        };
    }
}
