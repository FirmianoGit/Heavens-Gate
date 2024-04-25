import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CongregacaoService } from '../services/congregacao.service';
import { CreateCongregacaoDto } from '../common/dto/congregacao/create-congregacao.dto';
import { UpdateCongregacaoDto } from '../common/dto/congregacao/update-congregacao.dto';

@Controller('congregacao')
export class CongregacaoController {
  constructor(private readonly congregacaoService: CongregacaoService) {}

  @Post()
  CriarCongregacao(@Body() createCongregacaoDto: CreateCongregacaoDto) {
    return this.congregacaoService.CriarCongregacao(createCongregacaoDto);
  }

  @Get()
  ListarCongregacoes() {
    return this.congregacaoService.ListarCongregacoes();
  }

  @Get(':id')
  ListarCongregacaoPorId(@Param('id') id: number) {
    return this.congregacaoService.ListarCongregacoesPorId(id);
  }

  @Put(':id')
  ModificarCongragacao(@Param('id') id: number, @Body() updateCongregacaoDto: UpdateCongregacaoDto) {
    return this.congregacaoService.ModificarCongregacao(id, updateCongregacaoDto);
  }

  @Delete(':id')
  RemoverCongregacao(@Param('id') id: number) {
    return this.congregacaoService.DeletarCongregacao(id);
  }
}
