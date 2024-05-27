import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.criarGrupo(createGrupoDto);
  }

  @Get()
  findAll() {
    return this.grupoService.listarGrupos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoService.listarGrupoPorId(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.modificarGrupo(+id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoService.DeletarGrupo(+id);
  }
}
