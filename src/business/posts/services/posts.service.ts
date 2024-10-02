import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IService } from 'src/core/abstract/base/service.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';

@Injectable()
export class PostsService implements IService<PostEntity> {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<PostEntity[]> {
        const skip = (options.query.page - 1) * options.query.limit;
        const order = { id: options.query.sort };

        return await this.postsRepository.find({
            skip,
            take: options.query.limit,
            order,
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<PostEntity> {
        const post = await this.postsRepository.findOneBy({
            id: options.params.post,
        });

        if (!post) throw new NotFoundException();

        return post;
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<any> {
        const creatable = {
            title: options.body.title,
            text: options.body.text,
        } as DeepPartial<PostEntity>;

        return await this.postsRepository.save(creatable);
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const creatable = {} as DeepPartial<PostEntity>;

        return Boolean(
            await this.postsRepository.update(
                { id: options.params.post },
                creatable,
            ),
        );
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<boolean> {
        const post = await this.postsRepository.findOneBy({
            id: options.params.post,
        });

        if (!post) throw new NotFoundException();

        return Boolean(await this.postsRepository.remove(post));
    }
}
