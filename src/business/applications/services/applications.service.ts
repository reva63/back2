import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { ApplicationAttributesService } from './applicationAttributes.service';
import { ApplicationNotFoundException } from 'src/exceptions/applications/applicationNotFound.exception';
import { AttachmentsService } from 'src/core/attachments/services/attachments.service';
import { ExportFilter } from 'src/core/common/classes/filterOptions';
import * as XLSX from 'xlsx';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationsService implements IService<ApplicationEntity> {
    constructor(
        @InjectRepository(ApplicationEntity)
        private readonly applicationsRepository: Repository<ApplicationEntity>,
        private readonly applicationAttributesService: ApplicationAttributesService,
        private readonly attachmentsService: AttachmentsService,
        private readonly configService: ConfigService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ApplicationEntity[]> {
        return await this.applicationsRepository.find({
            loadRelationIds: {
                relations: ['applicant', 'directions', 'categories', 'contest'],
            },
            relations: { attributes: true, attachments: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        return await this.applicationsRepository.findOne({
            where: { id: options.params.application },
            loadRelationIds: {
                relations: ['applicant', 'directions', 'categories', 'contest'],
            },
            relations: { attributes: true, attachments: true },
        });
    }

    async create(
        options: { params?: IParamsDto; body?: IBodyDto },
        isUpdate?: boolean,
    ): Promise<DeepPartial<ApplicationEntity>> {
        const directions = options.body.directions
            ? options.body.directions.map((id) => ({
                  id,
              }))
            : undefined;
        const categories = options.body.categories
            ? options.body.categories.map((id) => ({
                  id,
              }))
            : undefined;

        return {
            id: isUpdate ? options.params.application : undefined,
            contest: { id: options.body.contest },
            applicant: { id: options.params.user },
            directions,
            categories,
        } as DeepPartial<ApplicationEntity>;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const attributes =
            await this.applicationAttributesService.create(options);
        const attachments = await this.attachmentsService.saveFiles(
            options.body.files,
        );
        const creatable = await this.create(options);
        const application = await this.applicationsRepository.save({
            ...creatable,
            attributes,
            attachments,
        });

        return await this.show({ params: { application: application.id } });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ApplicationEntity> {
        const application = { id: options.params.application };
        const isExists =
            await this.applicationsRepository.existsBy(application);
        if (!isExists) {
            throw new ApplicationNotFoundException();
        }

        const creatable = await this.create(options);
        await this.applicationsRepository.update(application, creatable);

        if (options.body.profileData || options.body.socialData?.length) {
            await this.applicationAttributesService.update(options);
        }

        return await this.show(options);
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const applicaion = await this.applicationsRepository.findOne({
            where: {
                id: options.params.application,
            },
            loadRelationIds: { relations: ['directions', 'categories'] },
            relations: { attachments: true }, // do not remove attachments. Subscriber depends on it
        });
        if (!applicaion) {
            throw new ApplicationNotFoundException();
        }

        await this.applicationsRepository.remove(applicaion);
    }

    async exportXLSX(exportFilter: ExportFilter) {
        const selectedFields = exportFilter.getSelectedFields();
        const whereConditions = exportFilter.getWhereConditions();

        const findManyOptions: FindManyOptions = {
            select: selectedFields,
            where: whereConditions,
            skip: 0,
            take: this.configService.getOrThrow<number>('LIST_UNLOAD_NUMBER'),
        };

        const sheet = XLSX.utils.aoa_to_sheet([selectedFields]);
        while (true) {
            const applications =
                await this.applicationsRepository.find(findManyOptions);
            if (applications.length === 0) break;
            const data = applications.map((app) => {
                const fieldsArray = [];
                for (let i = 0; i < selectedFields.length; i++) {
                    fieldsArray[i] = app[selectedFields[i]];
                }
                return fieldsArray;
            });

            XLSX.utils.sheet_add_aoa(sheet, data, { origin: -1 });
            findManyOptions.skip += findManyOptions.take;
        }

        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, sheet, 'Applications');
        const buf = XLSX.write(book, { type: 'buffer', bookType: 'xlsx' });
        return new StreamableFile(buf);
    }
}
