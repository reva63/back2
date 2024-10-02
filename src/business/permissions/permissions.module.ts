import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnity } from './entities/role.entity';
import { RightEntity } from './entities/right.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEnity, RightEntity])],
})
export class PermissionsModule {}
