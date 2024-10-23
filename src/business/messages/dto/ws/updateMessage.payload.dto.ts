import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IPayloadDto } from 'src/core/abstract/base/dto/payloadDto.interface';

export class UpdateMessagePayloadDto implements IPayloadDto {
    @IsNumber()
    message: number;

    @IsString()
    @IsOptional()
    text: string;
}
