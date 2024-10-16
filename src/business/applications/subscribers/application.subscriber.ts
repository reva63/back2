import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    RemoveEvent,
} from 'typeorm';
import { AttachmentsService } from 'src/core/attachments/services/attachments.service';
import { ApplicationEntity } from '../entities/application.entity';

@EventSubscriber()
export class ApplicationSubscriber
    implements EntitySubscriberInterface<ApplicationEntity>
{
    constructor(
        dataSource: DataSource,
        private readonly attachmentsService: AttachmentsService,
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo(): Function {
        return ApplicationEntity;
    }

    async beforeRemove(event: RemoveEvent<ApplicationEntity>): Promise<void> {
        await Promise.all(
            event.entity.attachments.map((attachment) =>
                this.attachmentsService.removeFileByKey(attachment.key),
            ),
        );
    }
}
