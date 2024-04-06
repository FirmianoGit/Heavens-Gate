import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Membros } from './membros.entity';

@Injectable()
export class membroService {
  constructor(
    @Inject('MEMBRO_REPOSITORY')
    private membroRepository: Repository<Membros>,
  ) {}

  async listar(): Promise<Membros[]> {
    return this.membroRepository.find()
  }
}