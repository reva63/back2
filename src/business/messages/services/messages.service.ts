import { Injectable } from '@nestjs/common';
import { IService } from 'src/core/abstract/base/service.interface';
import { MessageEntity } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';
import { IQueryDto } from 'src/core/abstract/base/dto/queryDto.interface';
import { IBodyDto } from 'src/core/abstract/base/dto/bodyDto.interface';
import { AttachmentsService } from 'src/core/attachments/services/attachments.service';
import { ChatsService } from 'src/business/chats/services/chats.service';
import { ChatNotFoundException } from 'src/exceptions/chats/chatNotFound.exception';
import { MessageNotFoundException } from 'src/exceptions/messages/messageNotFound.exception';

@Injectable()
export class MessagesService implements IService<MessageEntity> {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messagesRepository: Repository<MessageEntity>,
        private readonly chatsService: ChatsService,
        private readonly attachmentsService: AttachmentsService,
    ) {}

    async list(options: {
        params?: IParamsDto;
        query?: IQueryDto;
    }): Promise<MessageEntity[]> {
        const { page = 1, limit = 20 } = options.query;
        return await this.messagesRepository.find({
            where: {
                chat: { id: options.query.chat },
            },
            skip: (page - 1) * limit,
            take: limit,
            relations: { attachments: true },
        });
    }

    async show(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<MessageEntity> {
        return await this.messagesRepository.findOne({
            where: { id: options.params.message },
            relations: { attachments: true },
        });
    }

    async store(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<MessageEntity> {
        const doesChatExist = await this.chatsService.isExists(options);
        if (!doesChatExist) {
            throw new ChatNotFoundException();
        }

        const attachments = await this.attachmentsService.saveFiles(
            options.body.files,
        );

        const creatable = {
            author: { id: options.params.user },
            text: options.body.text,
            chat: { id: options.params.chat },
            attachments,
        } as DeepPartial<MessageEntity>;

        const message = await this.messagesRepository.save(creatable);
        return await this.show({ params: { message: message.id } });
    }

    async update(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<MessageEntity> {
        const doesMessageExists = await this.isExists(options);
        if (!doesMessageExists) {
            throw new MessageNotFoundException();
        }

        const creatable = {
            text: options.body.text,
        } as DeepPartial<MessageEntity>;

        await this.messagesRepository.update(
            { id: options.params.message },
            creatable,
        );

        return await this.show({ params: { message: options.params.message } });
    }

    async remove(options: {
        params?: IParamsDto;
        body?: IBodyDto;
    }): Promise<void> {
        const message = await this.messagesRepository.findOne({
            where: { id: options.params.message },
            relations: { attachments: true },
        });
        if (!message) {
            throw new MessageNotFoundException();
        }

        await this.messagesRepository.softRemove(message);
    }

    async isExists(options: { params?: IParamsDto }): Promise<boolean> {
        return await this.messagesRepository.existsBy({
            id: options.params.message,
        });
    }
}
