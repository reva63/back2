import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';

@Global()
@Module({
    imports: [JwtModule.registerAsync(getJwtConfig())],
    exports: [JwtModule],
})
export class GlobalJwtModule {}
