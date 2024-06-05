import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FrequentaService } from '../services/frequenta.service';
import { CreateFrequentaDto } from '../common/dto/frequenta/create-frequenta.dto';
import { UpdateFrequentaDto } from '../common/dto/frequenta/update-frequenta.dto';

@Controller('frequenta')
export class FrequentaController {
  constructor(private readonly frequentaService: FrequentaService) {}

  @Post()
  CriarFrequencia(@Body() createFrequentaDto: CreateFrequentaDto) {
    return this.frequentaService.criarFrequencia(createFrequentaDto);
  }

  @Get()
  ListarFrequencias() {
    return this.frequentaService.listarFrequencia();
  }

  @Get(':id')
  ListarFrequenciaPorId(@Param('id') id: string) {
    return this.frequentaService.listarFrequenciaPorId(+id);
  }

  @Put(':id')
  ModificarFrequencia(@Param('id') id: string, @Body() updateFrequentaDto: UpdateFrequentaDto) {
    return this.frequentaService.modificarFrequencia(+id, updateFrequentaDto);
  }

  @Delete(':id')
  DeletarMembro(@Param('id') id: string) {
    return this.frequentaService.DeletarFrequencia(+id);
  }
}
