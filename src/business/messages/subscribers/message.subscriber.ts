import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    UpdateEvent,
} from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

@EventSubscriber()
export class MessageSubscriber
    implements EntitySubscriberInterface<MessageEntity>
{
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return MessageEntity;
    }

    async beforeUpdate(event: UpdateEvent<MessageEntity>): Promise<void> {
        (event.entity as MessageEntity).editedAt = new Date();
    }
}
