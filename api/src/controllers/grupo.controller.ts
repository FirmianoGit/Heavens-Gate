import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GrupoService } from '../services/grupo.service';
import { CreateGrupoDto } from '../common/dto/grupo/create-grupo.dto';
import { UpdateGrupoDto } from '../common/dto/grupo/update-grupo.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  CriarGrupo(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.criarGrupo(createGrupoDto);
  }

  @Get()
  ListarGrupos() {
    return this.grupoService.listarGrupos();
  }

  @Get(':id')
  LiistarGrupoPorId(@Param('id') id: string) {
    return this.grupoService.listarGrupoPorId(+id);
  }

  @Put(':id')
  ModificarGrupo(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.modificarGrupo(+id, updateGrupoDto);
  }

  @Delete(':id')
  DeletarGrupo(@Param('id') id: string) {
    return this.grupoService.DeletarGrupo(+id);
  }
}
