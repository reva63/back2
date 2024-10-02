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
import { GetUsersParamsDto } from '../dto/get/getUsers.params.dto';
import { GetUserByIdParamsDto } from '../dto/get/getUserById.params.dto';
import { CreateUserBodyDto } from '../dto/create/createUser.body.dto';
import { UpdateUserParamsDto } from '../dto/update/updateUser.params.dto';
import { UpdateUserBodyDto } from '../dto/update/updateUser.body.dto';
import { DeleteUserParamsDto } from '../dto/delete/deleteUser.params.dto';

@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async list(@Param() params: GetUsersParamsDto) {
        return await this.usersService.list({ params });
    }

    @Get('/:user')
    async show(@Param() params: GetUserByIdParamsDto) {
        return await this.usersService.show({ params });
    }

    @Post()
    async store(@Body() body: CreateUserBodyDto) {
        return await this.usersService.store({ body });
    }

    @Patch('/:user')
    async update(
        @Param() params: UpdateUserParamsDto,
        @Body() body: UpdateUserBodyDto,
    ) {
        await this.usersService.update({ params, body });
    }

    @Delete('/:user')
    async remove(@Param() params: DeleteUserParamsDto) {
        await this.usersService.remove({ params });
    }
}
