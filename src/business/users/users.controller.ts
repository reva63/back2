import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersSevice } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ControllerInterface } from 'src/core/abstract/base/controller.interface';
import { ParamsDtoInterface } from 'src/core/abstract/base/dto/paramsDto.interface';
import { UserResponse } from './interfaces/user-response.interface';

@Controller('users')
export class UsersController implements ControllerInterface<UserResponse> {
    constructor(private usersService: UsersSevice) {}

    @Get()
    async list(@Param() params: ParamsDtoInterface) {
        return await this.usersService.list(params);
    }

    @Get(':id')
    async show(@Param() params: ParamsDtoInterface) {
        return await this.usersService.show(params);
    }

    @Post()
    async store(
        @Param() params: ParamsDtoInterface,
        @Body() body: CreateUserDto,
    ) {
        return await this.usersService.store(params, body);
    }

    @Patch(':id')
    async update(
        @Param() params: ParamsDtoInterface,
        @Body() body: UpdateUserDto,
    ) {
        await this.usersService.update(params, body);
    }

    @Delete(':id')
    async remove(@Param() params: ParamsDtoInterface) {
        await this.usersService.remove(params);
    }
}
