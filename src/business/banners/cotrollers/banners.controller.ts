import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { BannersService } from '../services/banners.service';
import { ListBannersQueryDto } from '../dto/list/listBanners.query.dto';
import { RemoveBannerParamsDto } from '../dto/remove/removeBanner.params.dto';
import { ShowBannerParamsDto } from '../dto/show/ShowBanner.params.dto';
import { StoreBannerParamsDto } from '../dto/store/storeBanner.params.dto';
import { UpdateBannerBodyDto } from '../dto/update/updateBanner.body.dto';
import { UpdateBannerParamsDto } from '../dto/update/updateBanner.params.dto';
import { BannerEntity } from '../entities/banner.entity';
import { StoreBannerBodyDto } from '../dto/store/storeBanner.body.dto';

@Controller('/banners')
export class BannersController {
    constructor(private bannersService: BannersService) {}
    @Get()
    async list(@Query() query: ListBannersQueryDto): Promise<BannerEntity[]> {
        return await this.bannersService.list({ query });
    }

    @Get('/:banner')
    async show(@Param() params: ShowBannerParamsDto): Promise<BannerEntity> {
        return this.bannersService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreBannerParamsDto,
        @Body() body: StoreBannerBodyDto,
    ): Promise<void | BannerEntity> {
        return this.bannersService.store({ params, body });
    }

    @Patch('/:banner')
    async update(
        @Param() params: UpdateBannerParamsDto,
        @Body() body: UpdateBannerBodyDto,
    ): Promise<BannerEntity> {
        return await this.bannersService.update({ params, body });
    }

    @Delete('/:banner')
    async remove(@Param() params: RemoveBannerParamsDto): Promise<void> {
        await this.bannersService.remove({ params });
    }
}
