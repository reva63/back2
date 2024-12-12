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
import { ProfileEntity } from 'src/business/users/entities/profile.entity';
import { NotificationViewEntity } from 'src/business/notifications/entities/notificationViews.entity';
import { AddressEntity } from './address.entity';
import { PassportEntity } from './passport.entity';
import { SocialEntity } from './social.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    rsvId: number;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ nullable: true, unique: true })
    phone: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    profile: ProfileEntity;

    @OneToOne(() => AddressEntity, (address) => address.user, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    address: AddressEntity;

    @OneToOne(() => PassportEntity, (passport) => passport.user, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    passport: PassportEntity;

    @OneToMany(() => SocialEntity, (social) => social.user, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
    })
    socials: SocialEntity[];

    @OneToMany(
        () => UserAttributeEntity,
        (userAttribute) => userAttribute.user,
        {
            cascade: ['insert'],
        },
    )
    userAttributes: UserAttributeEntity[];

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
        (notification) => notification.author,
        {
            cascade: ['remove'],
        },
    )
    notifications: NotificationEntity[];

    @OneToMany(() => NotificationViewEntity, (view) => view.user, {
        cascade: ['remove'],
    })
    notificationViews: NotificationViewEntity[];
}
