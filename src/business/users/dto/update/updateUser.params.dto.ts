import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class UpdateUserParamsDto implements IParamsDto {
    @ApiProperty()
    @IsNumberString()
    user: number;
}
