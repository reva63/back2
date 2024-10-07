import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from './entities/certificate.entity';
import { CertificatesController } from './controllers/certificates.controller';
import { CertificatesService } from './services/certificates.service';

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity])],
    controllers: [CertificatesController],
    providers: [CertificatesService],
})
export class CertificatesModule {}
