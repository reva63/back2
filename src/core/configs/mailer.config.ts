import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

export const getMailConfig = (): MailerAsyncOptions => ({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const transport = configService.getOrThrow<string>('MAIL_TRANSPORT');
        const mailFromName = configService.getOrThrow<string>('MAIL_FROM_NAME');
        const mailFromAddress = transport.split(':')[1].split('//')[1];

        return {
            transport,
            defaults: {
                from: `"${mailFromName}" <${mailFromAddress}>`,
            },
            template: {
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        };
    },
});
