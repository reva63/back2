import { Module } from '@nestjs/common';
import { ModeratorModule } from './moderator/moderator.module';

@Module({
  imports: [ModeratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
