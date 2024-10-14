import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { StoreProfileBodyDto } from '../dto/store/storeProfile.body.dto';
import { ShowProfileParamsDto } from '../dto/show/showProfile.params.dto';
import { UpdateProfileParamsDto } from '../dto/update/updateProfile.params.dto';
import { UpdateProfileBodyDto } from '../dto/update/updateProfile.body.dto';
import { RemoveProfileParamsDto } from '../dto/remove/removeProfile.params.dto';

@Controller('/profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Get()
    async list() {
        return await this.profilesService.list({});
    }

    @Get('/:profile')
    async show(@Param() params: ShowProfileParamsDto) {
        return await this.profilesService.show({ params });
    }

    @Post()
    async store(@Body() body: StoreProfileBodyDto) {
        // TODO: assign user id in params (from authentication)
        const user = body.user;
        return await this.profilesService.store({ params: { user }, body });
    }

    @Patch('/:profile')
    async update(
        @Param() params: UpdateProfileParamsDto,
        @Body() body: UpdateProfileBodyDto,
    ) {
        return await this.profilesService.update({ params, body });
    }

    @Delete('/:profile')
    async remove(@Param() params: RemoveProfileParamsDto) {
        return this.profilesService.remove({ params });
    }
}
