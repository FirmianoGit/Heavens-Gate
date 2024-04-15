import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CongregacaoService } from '../services/congregacao.service';
import { CreateCongregacaoDto } from '../common/dto/congregacao/create-congregacao.dto';
import { UpdateCongregacaoDto } from '../common/dto/congregacao/update-congregacao.dto';

@Controller('congregacao')
export class CongregacaoController {
  constructor(private readonly congregacaoService: CongregacaoService) {}

  @Post()
  create(@Body() createCongregacaoDto: CreateCongregacaoDto) {
    return this.congregacaoService.create(createCongregacaoDto);
  }

  @Get()
  findAll() {
    return this.congregacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congregacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCongregacaoDto: UpdateCongregacaoDto) {
    return this.congregacaoService.update(+id, updateCongregacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congregacaoService.remove(+id);
  }
}
