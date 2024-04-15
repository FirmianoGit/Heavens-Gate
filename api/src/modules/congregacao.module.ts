import { Module } from '@nestjs/common';
import { CongregacaoService } from '../services/congregacao.service';
import { CongregacaoController } from '../controllers/congregacao.controller';
import { congregacaoProviders } from '../providers/congregacao.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CongregacaoController],
  providers: 
  [
    ...congregacaoProviders,
    CongregacaoService],
})
export class CongregacaoModule {}
