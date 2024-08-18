import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersSevice } from './users.service';
import { UpdateUserBodyDto } from './dto/update/updateUser.body.dto';
import { ControllerInterface } from 'src/core/abstract/base/controller.interface';
import { UserResponse } from './interfaces/user-response.interface';
import { UpdateUserParamsDto } from './dto/update/updateUser.params.dto';
import { CreateUserBodyDto } from './dto/create/createUser.body.dto';
import { GetUsersParamsDto } from './dto/get/getUsers.params.dto';
import { GetUserByIdParamsDto } from './dto/get/getUserById.params.dto';
import { CreateUserParamsDto } from './dto/create/createUser.params.dto';
import { DeleteUserParamsDto } from './dto/delete/deleteUser.params.dto';

@Controller('/users')
export class UsersController implements ControllerInterface<UserResponse> {
    constructor(private usersService: UsersSevice) {}

    @Get()
    async list(@Param() params: GetUsersParamsDto) {
        return await this.usersService.list(params);
    }

    @Get('/:id')
    async show(@Param() params: GetUserByIdParamsDto) {
        return await this.usersService.show(params);
    }

    @Post()
    async store(
        @Param() params: CreateUserParamsDto,
        @Body() body: CreateUserBodyDto,
    ) {
        return await this.usersService.store(params, body);
    }

    @Patch('/:id')
    async update(
        @Param() params: UpdateUserParamsDto,
        @Body() body: UpdateUserBodyDto,
    ) {
        await this.usersService.update(params, body);
    }

    @Delete('/:id')
    async remove(@Param() params: DeleteUserParamsDto) {
        await this.usersService.remove(params);
    }
}
