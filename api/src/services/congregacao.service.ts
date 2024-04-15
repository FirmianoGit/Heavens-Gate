import { Inject, Injectable } from '@nestjs/common';
import { CreateCongregacaoDto } from '../common/dto/congregacao/create-congregacao.dto';
import { UpdateCongregacaoDto } from '../common/dto/congregacao/update-congregacao.dto';

@Injectable()
export class CongregacaoService {
  @Inject('CONGREGACAO_REPOSITORY')
  create(createCongregacaoDto: CreateCongregacaoDto) {
    return 'This action adds a new congregacao';
  }

  findAll() {
    return `This action returns all congregacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congregacao`;
  }

  update(id: number, updateCongregacaoDto: UpdateCongregacaoDto) {
    return `This action updates a #${id} congregacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} congregacao`;
  }
}
