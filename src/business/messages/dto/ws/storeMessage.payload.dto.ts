import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { IPayloadDto } from 'src/core/abstract/base/dto/payloadDto.interface';
import { MessageFileDataPayloadDto } from '../messageFileData.payload.dto';

export class StoreMessagePayloadDto implements IPayloadDto {
    @IsNumber()
    @Transform(({ value }) => Number(value))
    user: number;

    @IsString()
    text: string;

    @ValidateNested({ each: true })
    @Type(() => MessageFileDataPayloadDto)
    @IsArray()
    @IsOptional()
    files: MessageFileDataPayloadDto[];

    @IsNumber()
    @Transform(({ value }) => Number(value))
    chat: number;
}
