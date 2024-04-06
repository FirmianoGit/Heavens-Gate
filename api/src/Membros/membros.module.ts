import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { membroProviders } from './membros.providers';
import { membroService } from './membros.service';
import { membroController } from './membros.controller';

@Module({
  imports: [DatabaseModule],
  controllers:[membroController],
  providers: [
    ...membroProviders,
    membroService,
  ],
})
export class membroModule {}