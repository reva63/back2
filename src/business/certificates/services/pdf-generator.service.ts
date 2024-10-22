import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as fs from 'fs';
import * as path from 'path';
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { CertificateEntity } from '../entities/certificate.entity';
import { Injectable } from '@nestjs/common';
import { StagesService } from 'src/business/stages/services/stages.service';

@Injectable()
export class PdfService {
    constructor(private readonly stagesService: StagesService) {}
    async generatePdf(certificate: CertificateEntity) {
        const fonts: TFontDictionary = {
            Rubik: {
                normal: '/fonts/rubik/Rubik-Regular.ttf',
            },
        };
        const pdfMakeConstants = {
            VFS: {
                'fonts/rubik/Rubik-Regular.ttf': await fs.promises.readFile(
                    path.join(
                        __dirname,
                        '../../..',
                        'assets/fonts/rubik/Rubik-Regular.ttf',
                    ),
                ),
            },
        };
        pdfFonts.pdfMake.vfs = Object.assign(
            {},
            pdfFonts.pdfMake.vfs,
            pdfMakeConstants.VFS,
        );

        const dd = {
            defaultStyle: {
                font: 'Rubik',
                fontSize: 20,
                color: '#FFFFFF',
            },
            pageOrientation: 'landscape',
            pageMargins: [0, 0, 0, 0],
            content: [
                {
                    image: await this.getTemplate(certificate),
                    width: 841.995, // exact width of A4 landscape page in pdfmake
                },
                {
                    text: `${certificate.user.profile.firstName} ${certificate.user.profile.firstName}`,
                    absolutePosition: { x: 240, y: 270 },
                    alignment: 'center',
                },
                {
                    text: certificate.contest.title,
                    absolutePosition: { y: 310 },
                    alignment: 'center',
                },
                {
                    text: certificate.direction.title,
                    absolutePosition: { x: 540, y: 310 },
                    alignment: 'center',
                },
                {
                    text: certificate.user.profile.country,
                    absolutePosition: { x: 240, y: 350 },
                    alignment: 'center',
                },
                {
                    text: certificate.user.profile.region,
                    absolutePosition: { y: 390 },
                    alignment: 'center',
                },
                {
                    text: certificate.user.profile.city,
                    absolutePosition: { x: 540, y: 390 },
                    alignment: 'center',
                },
            ],
        };

        const pdfDocGenerator = pdfMake.createPdf(
            dd as TDocumentDefinitions,
            null,
            fonts,
            pdfFonts.pdfMake.vfs,
        );
        return await this.generateBuffer(pdfDocGenerator);
    }

    private async generateBuffer(pdfDoc: pdfMake.TCreatedPdf) {
        const buffer = await new Promise<Buffer>((resolve, reject) => {
            pdfDoc.getBuffer((buffer: Buffer) => {
                try {
                    resolve(buffer);
                } catch (error) {
                    reject(error);
                }
            });
        });

        const chunkSize = 5;
        let offset = 0;
        const chunks = [];
        while (offset < buffer.length) {
            const chunk = buffer.subarray(offset, offset + chunkSize);
            chunks.push(chunk);
            offset += chunkSize;
        }

        return Buffer.concat(chunks);
    }

    private async getTemplate(certificate): Promise<string> {
        const templateStream = await this.stagesService.getTemplate(
            certificate.stage,
        );
        return (
            'data:image/jpeg;base64,' +
            (await templateStream.transformToString('base64'))
        );
    }
}
