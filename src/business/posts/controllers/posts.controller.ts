import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ListPostsParamsDto } from '../dto/get/list/listPosts.params.dto';
import { ShowPostByIdParamsDto } from '../dto/get/show/showPostById.params.dto';
import { CreatePostParamsDto } from '../dto/create/createPost.param.dto';
import { PostEntity } from '../entities/post.entity';
import { CreatePostBodyDto } from '../dto/create/createPost.body.dto';
import { UpdatePostParamsDto } from '../dto/update/updatePost.param.dto';
import { UpdatePostBodyDto } from '../dto/update/updatePost.body.dto';
import { DeletePostParamsDto } from '../dto/delete/deletePost.params.dto';

@Controller('/posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async list(@Param() params: ListPostsParamsDto): Promise<PostEntity[]> {
        return await this.postsService.list({ params });
    }

    @Get('/:post')
    async show(@Param() params: ShowPostByIdParamsDto): Promise<PostEntity> {
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
