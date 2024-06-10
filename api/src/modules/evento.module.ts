import { Module } from '@nestjs/common';
import { EventoService } from '../services/evento.service';
import { EventoController } from 'src/controllers/evento.controller';
import { DatabaseModule } from 'src/database/database.module';
import { eventoProviders } from 'src/providers/evento.provider';
import { gestorProviders } from 'src/providers/gestor.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [EventoController],
  providers: [
    ...gestorProviders,
    ...eventoProviders,
    EventoService],
})
export class EventoModule {}
