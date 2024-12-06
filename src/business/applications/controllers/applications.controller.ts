import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Patch,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from '../services/applications.service';
import { StoreApplicationBodyDto } from '../dto/store/storeApplication.body.dto';
import { ShowApplicationParamsDto } from '../dto/show/showApplication.params.dto';
import { UpdateApplicationBodyDto } from '../dto/update/updateApplication.body.dto';
import { UpdateApplicationParamsDto } from '../dto/update/updateApplication.params.dto';
import { RemoveApplicationParamsDto } from '../dto/remove/removeApplication.params.dto';
import { MultipartInterceptor } from 'src/core/common/interceptors/multipart.interceptor';
import { ExportFilter } from 'src/core/common/classes/filterOptions';

@Controller('/applications')
export class ApplicationsController {
    constructor(private applicationsService: ApplicationsService) {}

    @Get()
    async list() {
        return await this.applicationsService.list({});
    }

    @Get('/:application')
    async show(@Param() params: ShowApplicationParamsDto) {
        return await this.applicationsService.show({ params });
    }

    @Post()
    @UseInterceptors(MultipartInterceptor)
    async store(@Body() body: StoreApplicationBodyDto) {
        // TODO: assign user id in params (from authentication)
        const user = body.user;
        return await this.applicationsService.store({ params: { user }, body });
    }

    @Patch('/:application')
    async update(
        @Param() params: UpdateApplicationParamsDto,
        @Body() body: UpdateApplicationBodyDto,
    ) {
        return await this.applicationsService.update({ params, body });
    }

    @Delete('/:application')
    async remove(@Param() params: RemoveApplicationParamsDto) {
        return await this.applicationsService.remove({ params });
    }

    @Post('/export')
    @Header('Content-Disposition', 'attachment; filename="Applications.xlsx"')
    async exportXLSX(@Body() body: ExportFilter) {
        return await this.applicationsService.exportXLSX(body);
    }
}
