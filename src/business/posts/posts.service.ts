import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ServiceInterface } from 'src/core/abstract/base/posts/service.interface';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostsParamsDto } from './dto/get/getPosts.params.dto';
import { GetPostByIdParamsDto } from './dto/get/getPostById.params.dto';
import { CreatePostParamsDto } from './dto/create/createPost.param.dto';
import { CreatePostBodyDto } from './dto/create/createPost.body.dto';
import { UpdatePostParamsDto } from './dto/update/updatePost.param.dto';
import { UpdatePostBodyDto } from './dto/update/updatePost.body.dto';
import { DeletePostParamsDto } from './dto/delete/deletePost.params.dto';

@Injectable()
export class PostsService implements ServiceInterface<Post> {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
    ) {}

    async list(params: GetPostsParamsDto): Promise<Post[]> {
        return await this.postsRepository.find();
    }

    async show(params: GetPostByIdParamsDto): Promise<Post> {
        const { id } = params;
        const post = await this.postsRepository.findOneBy({ id });
        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }

    async store(
        params: CreatePostParamsDto,
        body: CreatePostBodyDto,
    ): Promise<Post> {
        const post = this.postsRepository.create(body);
        return await this.postsRepository.save(post);
    }

    async update(
        params: UpdatePostParamsDto,
        body: UpdatePostBodyDto,
    ): Promise<boolean> {
        const { id } = params;
        return Boolean(
            await this.postsRepository.update({ id }, body).catch(() => {
                throw new BadRequestException();
            }),
        );
    }

    async remove(params: DeletePostParamsDto): Promise<boolean> {
        const { id } = params;
        const post = await this.postsRepository.findOneBy({ id });
        if (!post) {
            throw new NotFoundException();
        }
        return Boolean(await this.postsRepository.remove(post));
    }
}
