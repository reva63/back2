import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Patch,
    Post,
    UseGuards,
    Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ListUsersParamsDto } from '../dto/list/listUsers.params.dto';
import { ShowUserParamsDto } from '../dto/show/showUser.params.dto';
import { StoreUserBodyDto } from '../dto/store/storeUser.body.dto';
import { UpdateUserParamsDto } from '../dto/update/updateUser.params.dto';
import { UpdateUserBodyDto } from '../dto/update/updateUser.body.dto';
import { RemoveUserParamsDto } from '../dto/remove/removeUser.params.dto';
import { JwtGuard } from 'src/business/auth/guard/jwt.guard';
import { ListUsersQueryDto } from '../dto/list/listUsers.query.dto';
import { ExportFilter } from 'src/core/common/classes/filterOptions';
import { UserOwnerGuard } from '../guards/userOwner.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Get a list of users' })
    @ApiResponse({
        status: 200,
        description: 'List of users returned successfully',
    })
    @Get()
    async list(
        @Param() params: ListUsersParamsDto,
        @Query() query: ListUsersQueryDto,
    ) {
        return await this.usersService.list({ params, query });
    }

    @ApiOperation({ summary: 'Get details of a specific user' })
    @ApiResponse({
        status: 200,
        description: 'User details returned successfully',
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get('/:user')
    async show(@Param() params: ShowUserParamsDto) {
        return await this.usersService.show({ params });
    }

    @ApiOperation({ summary: 'Get contests for a specific user' })
    @ApiResponse({
        status: 200,
        description: 'List of contests returned successfully',
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get('/:user/contests')
    async listUserContests(@Param() params: ShowUserParamsDto) {
        return await this.usersService.listUserContests({ params });
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request body' })
    @Post()
    async store(@Body() body: StoreUserBodyDto) {
        return await this.usersService.store({ body });
    }

    @ApiOperation({ summary: 'Update an existing user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request body' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @UseGuards(JwtGuard, UserOwnerGuard)
    @Patch('/:user')
    async update(
        @Param() params: UpdateUserParamsDto,
        @Body() body: UpdateUserBodyDto,
    ) {
        return await this.usersService.update({ params, body });
    }

    @ApiOperation({ summary: 'Remove a user' })
    @ApiResponse({ status: 200, description: 'User removed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @UseGuards(JwtGuard, UserOwnerGuard)
    @Delete('/:user')
    async remove(@Param() params: RemoveUserParamsDto) {
        await this.usersService.remove({ params });
    }

    @ApiOperation({ summary: 'Export users to XLSX' })
    @Post('/export')
    @Header('Content-Disposition', 'attachment; filename="Users.xlsx"')
    async exportXLSX(@Body() body: ExportFilter) {
        return await this.usersService.exportXLSX(body);
    }
}
