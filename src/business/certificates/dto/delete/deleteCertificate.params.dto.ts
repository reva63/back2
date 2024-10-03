import { IsNumberString } from 'class-validator';
import { IParamsDto } from 'src/core/abstract/base/dto/paramsDto.interface';

export class DeleteCertificateParamsDto implements IParamsDto {
    @IsNumberString()
    certificate: number;
}
