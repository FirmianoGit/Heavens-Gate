import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { membroService } from '../services/membros.service';
import { Membro } from '../models/membros.entity';
import { CreateMembrosDto } from '../common/dto/membro/create-membros.dto'
import { UpdateMembroDto } from '../common/dto/membro/update-membros.dto';

@Controller('membros')
export class membroController {
  constructor(private readonly membroService: membroService) {}

  @Get()
  async listarMembros(): Promise<Membro[]>{
    return this.membroService.listar();
  }

  @Post()
  async CriarMembro( @Body() createMembrodto: CreateMembrosDto){
    return this.membroService.criarMembro(createMembrodto);
  }

  @Get(':id')
  async ListarPorCpf(@Param('id') id: number): Promise<Membro>{
    const MembroAchado = await this.membroService.listarPorId(id);
    if (!MembroAchado) {
      throw new NotFoundException(`Membro com o id: ${id} Não encontrado`);
    }
    return MembroAchado;
  }

  @Put(':id')
  ModificarMembro(@Param('id') id:number, @Body() updateMembroDto: UpdateMembroDto): Promise<Membro>{
    return this.membroService.modificarMembro(id, updateMembroDto);
  }

  @Delete(':id')
  DeletarMembro(@Param('id') id:number): Promise<void>{
     return this.membroService.DeletarMembro(id);
  }
}