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
import { PostsService } from '../services/posts.service';
import { ShowPostParamsDto } from '../dto/show/showPost.params.dto';
import { StorePostParamsDto } from '../dto/store/storePost.param.dto';
import { PostEntity } from '../entities/post.entity';
import { StorePostBodyDto } from '../dto/store/storePost.body.dto';
import { UpdatePostParamsDto } from '../dto/update/updatePost.param.dto';
import { UpdatePostBodyDto } from '../dto/update/updatePost.body.dto';
import { RemovePostParamsDto } from '../dto/remove/removePost.params.dto';
import { ListPostsQueryDto } from '../dto/list/listPosts.query.dto';

@Controller('/posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async list(@Query() query: ListPostsQueryDto): Promise<PostEntity[]> {
        return await this.postsService.list({ query });
    }

    @Get('/:post')
    async show(@Param() params: ShowPostParamsDto): Promise<PostEntity> {
        return await this.postsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StorePostParamsDto,
        @Body() body: StorePostBodyDto,
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
    async remove(@Param() params: RemovePostParamsDto): Promise<void> {
        await this.postsService.remove({ params });
    }
}
