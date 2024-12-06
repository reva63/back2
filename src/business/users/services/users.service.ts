import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, In } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IService } from 'src/core/abstract/base/service.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ExportFilter } from 'src/core/common/classes/filterOptions';
import * as XLSX from 'xlsx';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements IService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<UserEntity[]> {
        const roleFilter = options.query.roles?.length
            ? In(options.query.roles)
            : undefined;
        return await this.usersRepository.find({
            where: { roles: { title: roleFilter } },
            relations: { profile: true, roles: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        return user ?? null;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserEntity> {
        const creatable = { id: options.body.id } as DeepPartial<UserEntity>;
        return await this.usersRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        if (!user) {
            throw new NotFoundException();
        }
        const creatable = {} as DeepPartial<UserEntity>;

        await this.usersRepository.update({ id: user.id }, creatable);
        return await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const user = await this.usersRepository.findOne({
            where: { id: options.params.user },
        });
        if (!user) {
            throw new NotFoundException();
        }

        await this.usersRepository.remove(user);
    }

    async listUserContests(options: { params?: IParamsDto; body?: IBodyDto }) {
        const user = await this.usersRepository.findOne({
            relations: ['applications', 'applications.contest'],
            where: { id: options.params.user },
        });
        return user.applications.map((application) => application.contest);
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

        const ws = XLSX.utils.aoa_to_sheet([selectedFields]);
        while (true) {
            const users = await this.usersRepository.find(findManyOptions);
            if (users.length === 0) break;
            const data = users.map((app) => {
                const fieldsArray = [];
                for (let i = 0; i < selectedFields.length; i++) {
                    fieldsArray[i] = app[selectedFields[i]];
                }
                return fieldsArray;
            });

            XLSX.utils.sheet_add_aoa(ws, data, { origin: -1 });
            findManyOptions.skip += findManyOptions.take;
        }

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        return new StreamableFile(buf);
    }
}
