import { Injectable, Inject, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Membro } from 'src/entities/membros.entity';
import { CreateMembrosDto } from '../common/dto/membro/create-membros.dto';
import { UpdateMembroDto } from '../common/dto/membro/update-membros.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class membroService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('MEMBRO_REPOSITORY')
    private membroRepository: Repository<Membro>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async listarMembros(): Promise<Membro[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.membroRepository.find()
  }

  async listarMembroPorId(id: number): Promise<Membro>{

    const options: FindOneOptions<Membro> = {
      where: { id: id },
    };
    
    const MembroEncontrado = this.membroRepository.findOne(options)

    if(!MembroEncontrado){

      throw new NotFoundException(`Membro com o id ${id} não encontrado`)
    }

    return MembroEncontrado
  }


  async criarMembro(createMembrosDto: CreateMembrosDto): Promise<Membro>{
    try{
      const NovoMembro = this.membroRepository.create(createMembrosDto);
      return this.membroRepository.save(NovoMembro)
    }
    catch{
      throw new NotAcceptableException(`O membro não pode ser criado, verifique se as informações estão corretas`)
    }
  } 

  
  async modificarMembro(id:number, updateMembroDto: UpdateMembroDto): Promise<Membro>{
    
    const MembroAchado = await this.listarMembroPorId(id);

    this.membroRepository.merge(MembroAchado, updateMembroDto);
    
    return this.membroRepository.save(MembroAchado)
  }

async DeletarMembro(id: number): Promise<void>{
  const MembroAchado = await this.listarMembroPorId(id);
  await this.membroRepository.remove(MembroAchado);
}

}