import { IsString } from 'class-validator';
import { ICallbackQuery } from '../interfaces/callbackQuery.interface';

export class CallbackQueryDto implements ICallbackQuery {
    @IsString()
    public code: string;

    @IsString()
    public state: string;
}
