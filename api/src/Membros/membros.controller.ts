import { Controller, Get } from '@nestjs/common';
import { membroService } from './membros.service';
import { Membros } from './membros.entity';

@Controller('membro')
export class membroController {
  constructor(private readonly membroService: membroService) {}

  @Get()
  async listarMembros(): Promise<Membros[]>{
    return this.membroService.listar()
  }

}