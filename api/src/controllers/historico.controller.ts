import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { HistoricoService } from '../services/historico.service';
import { CreateHistoricoDto } from '../common/dto/historico/create-historico.dto';
import { UpdateHistoricoDto } from '../common/dto/historico/update-historico.dto';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Post()
  create(@Body() createHistoricoDto: CreateHistoricoDto) {
    return this.historicoService.criarHistorico(createHistoricoDto);
  }

  @Get()
  findAll() {
    return this.historicoService.listarHistorico();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoService.listarHistoricoPorId(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHistoricoDto: UpdateHistoricoDto) {
    return this.historicoService.modificarHistorico(+id, updateHistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoService.DeletarHistorico(+id);
  }
}
