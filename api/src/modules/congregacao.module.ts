import { Module } from '@nestjs/common';
import { CongregacaoService } from '../services/congregacao.service';
import { CongregacaoController } from '../controllers/congregacao.controller';
import { congregacaoProviders } from '../providers/congregacao.provider';
import { DatabaseModule } from 'src/database/database.module';
import { gestorProviders } from 'src/providers/gestor.provider';
import { membroProviders } from 'src/providers/membros.providers';
import { eventoProviders } from 'src/providers/evento.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CongregacaoController],
  providers: 
  [
    ...eventoProviders,
    ...membroProviders,
    ...gestorProviders,
    ...congregacaoProviders,
    CongregacaoService],
})
export class CongregacaoModule {}
