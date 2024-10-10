import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CertificatesService } from '../services/certificates.service';
import { CertificateEntity } from '../entities/certificate.entity';
import { StoreCertificateBodyDto } from '../dto/store/storeCertificate.body.dto';
import { StoreCertificateParamsDto } from '../dto/store/storeCertificate.params.dto';
import { RemoveCertificateParamsDto } from '../dto/remove/removeCertificate.params.dto';
import { UpdateCertificateBodyDto } from '../dto/update/updateCertificate.body.dto';
import { UpdateCertificateParamsDto } from '../dto/update/updateCertificate.params.dto';
import { ListCertificatesParamsDto } from '../dto/list/listCertificates.params.dto';
import { ShowCertificateParamsDto } from '../dto/show/ShowCertificate.params.dto';

@Controller('/certificates')
export class CertificatesController {
    constructor(private certificatesService: CertificatesService) {}

    @Get()
    async list(
        @Param() params: ListCertificatesParamsDto,
    ): Promise<CertificateEntity[]> {
        return await this.certificatesService.list({ params });
    }

    @Get('/:certificate')
    async show(
        @Param() params: ShowCertificateParamsDto,
    ): Promise<CertificateEntity> {
        return this.certificatesService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreCertificateParamsDto,
        @Body() body: StoreCertificateBodyDto,
    ): Promise<void | CertificateEntity> {
        return this.certificatesService.store({ params, body });
    }

    @Patch('/:certificate')
    async update(
        @Param() params: UpdateCertificateParamsDto,
        @Body() body: UpdateCertificateBodyDto,
    ): Promise<CertificateEntity> {
        return await this.certificatesService.update({ params, body });
    }

    @Delete('/:certificate')
    async remove(@Param() params: RemoveCertificateParamsDto): Promise<void> {
        await this.certificatesService.remove({ params });
    }
}
