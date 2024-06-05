import { Module } from '@nestjs/common';
import { FrequentaService } from '../services/frequenta.service';
import { FrequentaController } from '../controllers/frequenta.controller';
import { DatabaseModule } from 'src/database/database.module';
import { frequentaProviders } from 'src/providers/frequenta.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FrequentaController],
  providers: [
    ...frequentaProviders,
    FrequentaService],
})
export class FrequentaModule {}
