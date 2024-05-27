import { Module } from '@nestjs/common';
import { HistoricoService } from '../services/historico.service';
import { HistoricoController } from '../controllers/historico.controller';
import { DatabaseModule } from 'src/database/database.module';
import { historicoProviders } from 'src/providers/historico.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricoController],
  providers: [
    ...historicoProviders,
    HistoricoService],
})
export class HistoricoModule {}
