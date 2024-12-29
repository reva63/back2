import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class RemoveAttributeParamsDto implements IParamsDto {
    @ApiProperty()
    @IsNumberString()
    attribute: number;
}
