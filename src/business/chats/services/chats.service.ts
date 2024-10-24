import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { ChatEntity } from '../entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { ChatNotFoundException } from 'src/exceptions/chats/chatNotFound.exception';

@Injectable()
export class ChatsService implements IService<ChatEntity> {
    constructor(
        @InjectRepository(ChatEntity)
        private readonly chatsRepository: Repository<ChatEntity>,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<ChatEntity[]> {
        return await this.chatsRepository.find({
            where: {
                operator: { id: options.query.operator },
            },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ChatEntity> {
        return await this.chatsRepository.findOne({
            where: { id: options.params.chat },
        });
    }

    async showUserChat(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ChatEntity> {
        return await this.chatsRepository.findOne({
            where: {
                user: { id: options.params.user },
            },
            relations: {},
        });
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<ChatEntity> {
        const creatable = {
            user: { id: options.params.user },
        } as DeepPartial<ChatEntity>;
        return await this.chatsRepository.save(creatable);
    }

    async assignCurrentOperator(options: {
        params?: IParamsDto;
    }): Promise<void> {
        const isExists = await this.chatsRepository.existsBy({
            id: options.params.chat,
        });
        if (!isExists) {
            throw new ChatNotFoundException();
        }

        await this.chatsRepository.update(
            { id: options.params.chat },
            { operator: { id: options.params.operator } },
        );
    }

    async isExists(options: { params?: IParamsDto }): Promise<boolean> {
        return await this.chatsRepository.existsBy({
            id: options.params.chat,
        });
    }
}
