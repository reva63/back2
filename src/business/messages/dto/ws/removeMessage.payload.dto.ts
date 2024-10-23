import { IsNumber } from 'class-validator';
import { IPayloadDto } from 'src/core/abstract/base/dto/payloadDto.interface';

export class RemoveMessagePayloadDto implements IPayloadDto {
    @IsNumber()
    message: number;

    @IsNumber()
    chat: number;
}
