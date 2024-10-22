import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from './entities/certificate.entity';
import { CertificatesController } from './controllers/certificates.controller';
import { CertificatesService } from './services/certificates.service';
import { PdfService } from './services/pdf-generator.service';
import { StagesModule } from '../stages/stages.module';

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity]), StagesModule],
    controllers: [CertificatesController],
    providers: [CertificatesService, PdfService],
    exports: [CertificatesService],
})
export class CertificatesModule {}
