import { Module } from '@nestjs/common';
import { SedeService } from '../services/sede.service';
import { SedeController } from '../controllers/sede.controller';
import { CongregacaoModule } from './congregacao.module';
import { sedeProviders } from 'src/providers/sede.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SedeController],
  providers: [
    ...sedeProviders,
    SedeService,
  ],
})
export class SedeModule {}
