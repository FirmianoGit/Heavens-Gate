import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SedeService } from '../services/sede.service';
import { CreateSedeDto } from '../common/dto/Sede/create-sede.dto';
import { UpdateSedeDto } from '../common/dto/Sede/update-sede.dto';

@Controller('sede')
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  CriarSede(@Body() createSedeDto: CreateSedeDto) {
    return this.sedeService.CriarSede(createSedeDto);
  }

  @Get()
  ListarSedes() {
    return this.sedeService.ListarSedes();
  }

  @Get(':id')
  ListarSedePorId(@Param('id') id: number) {
    return this.sedeService.ListarSedePorId(id);
  }

  @Put(':id')
  ModificarSede(@Param('id') id: number, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedeService.ModificarSede(id, updateSedeDto);
  }

  @Delete(':id')
  DeletarSede(@Param('id') id: number) {
    return this.sedeService.DeletarSede(id);
  }
}
