import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ServiceInterface } from 'src/core/abstract/base/service.interface';
import { Contest } from './entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContestParamsDto } from './dto/create/createContest.params.dto';
import { CreateContestBodyDto } from './dto/create/createContest.body.dto';
import { DeleteContestParamsDto } from './dto/delete/deleteContest.params.dto';
import { UpdateContestParamsDto } from './dto/update/updateContest.params.dto';
import { UpdateContestBodyDto } from './dto/update/updateContest.body.dto';
import { GetContestByIdParamsDto } from './dto/get/getContestById.params.dto';
import { GetContestsParamsDto } from './dto/get/getContests.params.dto';

@Injectable()
export class ContestsService implements ServiceInterface<Contest> {
    constructor(
        @InjectRepository(Contest)
        private contestRepository: Repository<Contest>,
    ) {}
    async list(params: GetContestsParamsDto): Promise<Contest[]> {
        return await this.contestRepository.find();
    }

    async show(params: GetContestByIdParamsDto): Promise<Contest> {
        const contest = await this.contestRepository.findOneBy({
            id: params.id,
        });
        if (!contest) {
            throw new NotFoundException();
        }
        return contest;
    }

    async store(
        params: CreateContestParamsDto,
        body: CreateContestBodyDto,
    ): Promise<Contest> {
        const contest = this.contestRepository.create(body);
        return await this.contestRepository.save(contest);
    }

    async update(
        params: UpdateContestParamsDto,
        body: UpdateContestBodyDto,
    ): Promise<boolean> {
        return Boolean(
            await this.contestRepository
                .update({ id: params.id }, body)
                .catch((error) => {
                    console.error(error);
                    throw new BadRequestException();
                }),
        );
    }

    async remove(params: DeleteContestParamsDto): Promise<boolean> {
        const contest = await this.contestRepository.findOneBy({
            id: params.id,
        });
        if (!contest) {
            throw new NotFoundException();
        }
        return Boolean(await this.contestRepository.remove(contest));
    }
}
