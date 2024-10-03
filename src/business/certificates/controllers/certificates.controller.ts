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
import { CreateCertificateBodyDto } from '../dto/create/createCertificate.body.dto';
import { CreateCertificateParamsDto } from '../dto/create/createCertificate.params.dto';
import { DeleteCertificateParamsDto } from '../dto/delete/deleteCertificate.params.dto';
import { GetCertificateByIdParamsDto } from '../dto/get/getCertificateById.params.dto';
import { UpdateCertificateBodyDto } from '../dto/update/updateCertificate.body.dto';
import { UpdateCertificateParamsDto } from '../dto/update/updateCertificate.params.dto';
import { GetCertificatesParamsDto } from '../dto/get/getCertificates.params.dto';

@Controller('/certificates')
export class CertificatesController {
    constructor(private certificatesService: CertificatesService) {}

    @Get()
    async list(
        @Param() params: GetCertificatesParamsDto,
    ): Promise<CertificateEntity[]> {
        return await this.certificatesService.list({ params });
    }

    @Get('/:certificate')
    async show(
        @Param() params: GetCertificateByIdParamsDto,
    ): Promise<CertificateEntity> {
        return this.certificatesService.show({ params });
    }

    @Post()
    async store(
        @Param() params: CreateCertificateParamsDto,
        @Body() body: CreateCertificateBodyDto,
    ): Promise<void | CertificateEntity> {
        return this.certificatesService.store({ params, body });
    }

    @Patch('/:certificate')
    async update(
        @Param() params: UpdateCertificateParamsDto,
        @Body() body: UpdateCertificateBodyDto,
    ): Promise<void> {
        await this.certificatesService.update({ params, body });
    }

    @Delete('/:certificate')
    async remove(@Param() params: DeleteCertificateParamsDto): Promise<void> {
        await this.certificatesService.remove({ params });
    }
}
