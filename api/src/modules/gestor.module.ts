import { Module } from '@nestjs/common';
import { GestorService } from '../services/gestor.service';
import { GestorController } from '../controllers/gestor.controller';
import { gestorProviders } from 'src/providers/gestor.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GestorController],
  providers: [
    ...gestorProviders,
    GestorService,
  ],
})
export class GestorModule {}
