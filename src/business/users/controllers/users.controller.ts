import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ListUsersParamsDto } from '../dto/list/listUsers.params.dto';
import { ShowUserParamsDto } from '../dto/show/showUser.params.dto';
import { StoreUserBodyDto } from '../dto/store/storeUser.body.dto';
import { UpdateUserParamsDto } from '../dto/update/updateUser.params.dto';
import { UpdateUserBodyDto } from '../dto/update/updateUser.body.dto';
import { RemoveUserParamsDto } from '../dto/remove/removeUser.params.dto';

@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async list(@Param() params: ListUsersParamsDto) {
        return await this.usersService.list({ params });
    }

    @Get('/:user')
    async show(@Param() params: ShowUserParamsDto) {
        return await this.usersService.show({ params });
    }

    @Get('/:user/contests')
    async showUserContests(@Param() params: ShowUserParamsDto) {
        return await this.usersService.showUserContests({ params });
    }

    @Post()
    async store(@Body() body: StoreUserBodyDto) {
        return await this.usersService.store({ body });
    }

    @Patch('/:user')
    async update(
        @Param() params: UpdateUserParamsDto,
        @Body() body: UpdateUserBodyDto,
    ) {
        return await this.usersService.update({ params, body });
    }

    @Delete('/:user')
    async remove(@Param() params: RemoveUserParamsDto) {
        await this.usersService.remove({ params });
    }
}
