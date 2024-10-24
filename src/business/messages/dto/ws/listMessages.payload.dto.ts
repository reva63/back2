import { IsNumber, IsOptional, Min } from 'class-validator';
import { IPayloadDto } from 'src/core/abstract/base/dto/payloadDto.interface';

export class ListMessagesPayloadDto implements IPayloadDto {
    @Min(1)
    @IsNumber()
    @IsOptional()
    page: number;

    @Min(1)
    @IsNumber()
    @IsOptional()
    limit: number;

    @IsNumber()
    chat: number;
}
