import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEnity } from 'src/business/permissions/entities/role.entity';
import { RightEntity } from 'src/business/permissions/entities/right.entity';
import { ChatEntity } from 'src/business/chats/entities/chat.entity';
import { MessageEntity } from 'src/business/messages/entities/message.entity';
import { CertificateEntity } from 'src/business/certificates/entities/certificate.entity';
import { UserAttributeEntity } from './userAttribute.entity';
import { NotificationEntity } from 'src/business/notifications/entities/notification.entity';
import { ApplicationEntity } from 'src/business/applications/entities/application.entity';
import { RatingEntity } from 'src/business/ratings/entities/rating.entity';
import { ProfileEntity } from 'src/business/profiles/entities/profile.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    rvsId: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @OneToMany(() => UserAttributeEntity, (attribute) => attribute.user, {
        cascade: ['insert'],
    })
    attributes: UserAttributeEntity[];

    @ManyToMany(() => RoleEnity, (role) => role.users)
    @JoinTable()
    roles: RoleEnity[];

    @ManyToMany(() => RightEntity, (right) => right.users)
    @JoinTable()
    rights: RightEntity[];

    @OneToOne(() => ChatEntity, (chat) => chat.user)
    userChat: ChatEntity;

    @OneToMany(() => ChatEntity, (chat) => chat.operator)
    operatorChats: ChatEntity[];

    @OneToMany(() => MessageEntity, (message) => message.author)
    messages: MessageEntity[];

    @OneToMany(() => CertificateEntity, (certificate) => certificate.user)
    certificates: CertificateEntity[];

    @OneToMany(() => ApplicationEntity, (application) => application.applicant)
    applications: ApplicationEntity[];

    @OneToMany(() => RatingEntity, (rating) => rating.expert)
    ratings: RatingEntity[];

    @OneToMany(
        () => NotificationEntity,
        (notification) => notification.receiver,
    )
    notifications: NotificationEntity[];
}
