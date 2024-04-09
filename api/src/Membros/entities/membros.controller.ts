import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { membroService } from './membros.service';
import { Membros } from './membros.entity';
import { CreateMembrosDto } from '../dto/create-membros.dto';
import { UpdateMembroDto } from '../dto/update-membros.dto';

@Controller('membros')
export class membroController {
  constructor(private readonly membroService: membroService) {}

  @Get()
  async listarMembros(): Promise<Membros[]>{
    return this.membroService.listar();
  }

  @Post()
  async CriarMembro( @Body() createMembrodto: CreateMembrosDto){
    return this.membroService.criarMembro(createMembrodto);
  }

  @Get(':CPF')
  async ListarPorCpf(@Param('CPF') cpf: number): Promise<Membros>{
    const MembroAchado = await this.membroService.listarPorCPF(cpf);
    if (!MembroAchado) {
      throw new NotFoundException(`User with ID ${cpf} not found`);
    }
    return MembroAchado;
  }

  @Put(':CPF')
  ModificarMembro(@Param('CPF') cpf:number, @Body() updateMembroDto: UpdateMembroDto): Promise<Membros>{
    return this.membroService.modificarMembro(cpf, updateMembroDto);
  }

  @Delete(':CPF')
  DeletarMembro(@Param('CPF') cpf:number): Promise<void>{
     return this.membroService.DeletarMembro(cpf);
  }
}