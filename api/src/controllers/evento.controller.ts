import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EventoService } from '../services/evento.service';
import { CreateEventoDto } from '../common/dto/evento/create-evento.dto';
import { UpdateEventoDto } from '../common/dto/evento/update-evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  CriaEvento(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.CriarEvento(createEventoDto);
  }

  @Get()
  ListarEventos() {
    return this.eventoService.ListarEventos();
  }

  @Get(':id')
  ListarEventoPorId(@Param('id') id: string) {
    return this.eventoService.ListarEventoPorId(+id);
  }

  @Get('gestor-de-sede')
  async listarEventosParaGestorDeSede() {
    return this.eventoService.listarEventosParaGestorDeSede();
  }

  @Get('gestor/:congregacaoId')
  async listarEventosParaGestor(@Param('congregacaoId') congregacaoId: number) {
    return this.eventoService.listarEventosParaGestor(congregacaoId);
  }

  @Get('/gestor-de-sede/:gestorId')
  getEventosPorGestorDeSede(@Param('gestorId') gestorId: number) {
    return this.eventoService.getEventosPorGestorDeSede(gestorId);
  }


  @Put(':id')
  ModificarEvento(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.ModificarEvento(+id, updateEventoDto);
  }

  @Delete(':id')
  DeletarEvento(@Param('id') id: string) {
    return this.eventoService.RemoverEvento(+id);
  }
}
