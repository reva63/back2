import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { StoreProfileBodyDto } from '../dto/store/storeProfile.body.dto';
import { ShowProfileParamsDto } from '../dto/show/showProfile.params.dto';
import { UpdateProfileParamsDto } from '../dto/update/updateProfile.params.dto';
import { UpdateProfileBodyDto } from '../dto/update/updateProfile.body.dto';
import { RemoveProfileParamsDto } from '../dto/remove/removeProfile.params.dto';
import { IAuthUser } from 'src/core/abstract/interfaces/authUser.interface';
import { User } from 'src/core/common/decorators/auth/user.decorator';
import { ProfileOwnerGuard } from '../guards/profileOwner.guard';
import { JwtGuard } from 'src/business/auth/guard/jwt.guard';

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
    async store(@Body() body: StoreProfileBodyDto, @User() user: IAuthUser) {
        return await this.profilesService.store({
            params: { user: user.id },
            body,
        });
    }

    @UseGuards(JwtGuard, ProfileOwnerGuard)
    @Patch('/:profile')
    async update(
        @Param() params: UpdateProfileParamsDto,
        @Body() body: UpdateProfileBodyDto,
    ) {
        return await this.profilesService.update({ params, body });
    }

    @UseGuards(JwtGuard, ProfileOwnerGuard)
    @Delete('/:profile')
    async remove(@Param() params: RemoveProfileParamsDto) {
        return this.profilesService.remove({ params });
    }
}
