import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Membros } from './membros.entity';
import { CreateMembrosDto } from '../dto/create-membros.dto';
import { UpdateMembroDto } from '../dto/update-membros.dto';

@Injectable()
export class membroService {
  //CONSTRUTOR FAZENDO A IJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('MEMBRO_REPOSITORY')
    private membroRepository: Repository<Membros>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async listar(): Promise<Membros[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.membroRepository.find()
  }

  async listarPorCPF(CPF: number): Promise<Membros>{

    const options: FindOneOptions<Membros> = {
      where: { CPF: CPF },
    };
    
    const MembroEncontrado = this.membroRepository.findOne(options)

    if(!MembroEncontrado){

      throw new NotFoundException('Membro com o cpf ' + CPF + ' não encontrado')
    }

    return MembroEncontrado
  }


  async criarMembro(createMembrosDto: CreateMembrosDto): Promise<Membros>{

    const NovoMembro = this.membroRepository.create(createMembrosDto)

    return this.membroRepository.save(NovoMembro)
  } 

  
  async modificarMembro(cpf:number, updateMembroDto: UpdateMembroDto): Promise<Membros>{
    
    const MembroAchado = await this.listarPorCPF(cpf);

    this.membroRepository.merge(MembroAchado, updateMembroDto);
    
    return this.membroRepository.save(MembroAchado)
  }

async DeletarMembro(cpf: number): Promise<void>{
  const MembroAchado = await this.listarPorCPF(cpf);
  await this.membroRepository.delete(MembroAchado);
}

}