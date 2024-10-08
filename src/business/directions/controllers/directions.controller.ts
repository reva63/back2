import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { DirectionEntity } from '../entities/direction.entity';
import { DirectionsService } from '../services/directions.service';
import { ListDirectionsParamsDto } from '../dto/list/listDirections.params.dto';
import { RemoveDirectionParamsDto } from '../dto/remove/removeDirection.params.dto';
import { ShowDirectionParamsDto } from '../dto/show/ShowDirection.params.dto';
import { StoreDirectionBodyDto } from '../dto/store/storeDirection.body.dto';
import { StoreDirectionParamsDto } from '../dto/store/storeDirection.params.dto';
import { UpdateDirectionBodyDto } from '../dto/update/updateDirection.body.dto';
import { UpdateDirectionParamsDto } from '../dto/update/updateDirection.params.dto';

@Controller('/directions')
export class DirectionsController {
    constructor(private directionsService: DirectionsService) {}

    @Get()
    async list(
        @Param() params: ListDirectionsParamsDto,
    ): Promise<DirectionEntity[]> {
        return await this.directionsService.list({ params });
    }

    @Get('/:direction')
    async show(
        @Param() params: ShowDirectionParamsDto,
    ): Promise<DirectionEntity> {
        return this.directionsService.show({ params });
    }

    @Post()
    async store(
        @Param() params: StoreDirectionParamsDto,
        @Body() body: StoreDirectionBodyDto,
    ): Promise<void | DirectionEntity> {
        return this.directionsService.store({ params, body });
    }

    @Patch('/:direction')
    async update(
        @Param() params: UpdateDirectionParamsDto,
        @Body() body: UpdateDirectionBodyDto,
    ): Promise<void> {
        await this.directionsService.update({ params, body });
    }

    @Delete('/:direction')
    async remove(@Param() params: RemoveDirectionParamsDto): Promise<void> {
        await this.directionsService.remove({ params });
    }
}
