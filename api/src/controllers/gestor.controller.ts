import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GestorService } from '../services/gestor.service';
import { CreateGestorDto } from '../common/dto/gestor/create-gestor.dto';
import { UpdateGestorDto } from '../common/dto/gestor/update-gestor.dto';

@Controller('gestor')
export class GestorController {
  constructor(private readonly gestorService: GestorService) {}

  @Post()
  CriarGestor(@Body() createGestorDto: CreateGestorDto) {
    return this.gestorService.CriarGestor(createGestorDto);
  }

  @Get()
  LIstarGestores() {
    return this.gestorService.ListarGestores();
  }

  @Get(':id')
  ListarGestorPorId(@Param('id') id: number) {
    return this.gestorService.ListarGestorPorId(id);
  }

  @Put(':id')
  ModificarGestor(
    @Param('id') id: number,
    @Body() updateGestorDto: UpdateGestorDto,
  ) {
    return this.gestorService.ModificarGestor(id, updateGestorDto);
  }

  @Delete(':id')
  Removergestor(@Param('id') id: number) {
    return this.gestorService.RemoverGestor(id);
  }

  @Get(':id/congregacoes')
  ListarCongregacoesDoGestor(@Param('id') id: string) {
    return this.gestorService.ListarCongregacoesDoGestor(+id);
  }
}
