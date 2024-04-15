import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { membroProviders } from '../providers/membros.providers';
import { membroService } from '../services/membros.service';
import { membroController } from '../controllers/membros.controller';

@Module({
  imports: [DatabaseModule],
  controllers:[membroController],
  providers: [
    ...membroProviders,
    membroService,
  ],
})
export class membroModule {}