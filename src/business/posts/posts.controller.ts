import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { GetPostsParamsDto } from './dto/get/getPosts.params.dto';
import { GetPostByIdParamsDto } from './dto/get/getPostById.params.dto';
import { CreatePostParamsDto } from './dto/create/createPost.param.dto';
import { CreatePostBodyDto } from './dto/create/createPost.body.dto';
import { UpdatePostParamsDto } from './dto/update/updatePost.param.dto';
import { UpdatePostBodyDto } from './dto/update/updatePost.body.dto';
import { DeletePostParamsDto } from './dto/delete/deletePost.params.dto';
import { PostsService } from './posts.service';

@Controller('/posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async list(@Param() params: GetPostsParamsDto): Promise<PostEntity[]> {
        return await this.postsService.list({ params });
    }

    @Get('/:post')
    async show(@Param() params: GetPostByIdParamsDto): Promise<PostEntity> {
        return await this.postsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: CreatePostParamsDto,
        @Body() body: CreatePostBodyDto,
    ): Promise<void | PostEntity> {
        return await this.postsService.store({ params, body });
    }

    @Patch('/:post')
    async update(
        @Param() params: UpdatePostParamsDto,
        @Body() body: UpdatePostBodyDto,
    ): Promise<void> {
        await this.postsService.update({ params, body });
    }

    @Delete('/:post')
    async remove(@Param() params: DeletePostParamsDto): Promise<void> {
        await this.postsService.remove({ params });
    }
}
