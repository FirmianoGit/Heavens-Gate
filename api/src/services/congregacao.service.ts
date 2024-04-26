import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Congregacao } from 'src/models/congregacao.entity';
import { CreateCongregacaoDto } from '../common/dto/congregacao/create-congregacao.dto';
import { UpdateCongregacaoDto } from '../common/dto/congregacao/update-congregacao.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateMembroDto } from 'src/common/dto/membro/update-membros.dto';

@Injectable()
export class CongregacaoService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('CONGREGACAO_REPOSITORY')
    private congregacaoRepository: Repository<Congregacao>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async ListarCongregacoes(): Promise<Congregacao[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.congregacaoRepository.find()
  }

  async ListarCongregacoesPorId(id: number): Promise<Congregacao>{

    const options: FindOneOptions<Congregacao> = {
      where: { id: id },
    };
    
    const congregacaoEncontrada = this.congregacaoRepository.findOne(options)

    if(!congregacaoEncontrada){

      throw new NotFoundException(`Membro com o id ${id} não encontrado`);
    }

    return congregacaoEncontrada
  }


  async CriarCongregacao(createCongregacaoDto: CreateCongregacaoDto): Promise<Congregacao>{

    try{
      const novaCongregacao = this.congregacaoRepository.create(createCongregacaoDto);
      return this.congregacaoRepository.save(novaCongregacao);
    }
    catch{
      throw new NotAcceptableException(`A congregacao não pode ser criada, verifique se as informações estão corretas`);
    }
  } 

  
  async ModificarCongregacao(id:number, updateCongregacaoDto: UpdateMembroDto): Promise<Congregacao>{
    
    const congregacaoAchada = await this.ListarCongregacoesPorId(id);

    this.congregacaoRepository.merge(congregacaoAchada, updateCongregacaoDto);
    
    return this.congregacaoRepository.save(congregacaoAchada);
  }

async DeletarCongregacao(id: number): Promise<void>{
  const congregacaoAchada = await this.ListarCongregacoesPorId(id);
  await this.congregacaoRepository.remove(congregacaoAchada);
}
}
