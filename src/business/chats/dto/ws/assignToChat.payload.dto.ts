import { IsNumber, ValidateIf } from 'class-validator';
import { IPayloadDto } from 'src/core/abstract/base/dto/payloadDto.interface';

export class AssignToChatPayloadDto implements IPayloadDto {
    @IsNumber()
    chat: number;

    @IsNumber()
    @ValidateIf((_, value) => value !== null)
    operator: number | null;
}
