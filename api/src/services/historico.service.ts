import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateHistoricoDto } from '../common/dto/historico/create-historico.dto';
import { UpdateHistoricoDto } from '../common/dto/historico/update-historico.dto';
import { Historico } from 'src/models/historico.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
@Injectable()
export class HistoricoService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('HISTORICO_REPOSITORY')
    private historicoRepository: Repository<Historico>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO HISTORICO PERSISTIDAS
  async listarHistorico(): Promise<Historico[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.historicoRepository.find()
  }

  async listarHistoricoPorId(id: number): Promise<Historico>{

    const options: FindOneOptions<Historico> = {
      where: { id: id },
    };
    
    const HistoricoEncontrado = this.historicoRepository.findOne(options)

    if(!HistoricoEncontrado){

      throw new NotFoundException(`Historico com o id ${id} não encontrado`)
    }

    return HistoricoEncontrado
  }


  async criarHistorico(createHistoricoDto: CreateHistoricoDto): Promise<Historico>{
    try{
      const NovoHistorico = this.historicoRepository.create(createHistoricoDto);
      return this.historicoRepository.save(NovoHistorico)
    }
    catch{
      throw new NotAcceptableException(`O historico não pode ser criado, verifique se as informações estão corretas`)
    }
  } 

  
  async modificarHistorico(id:number, updateHistoricoDto: UpdateHistoricoDto): Promise<Historico>{
    
    const HistoricoAchado = await this.listarHistoricoPorId(id);

    this.historicoRepository.merge(HistoricoAchado, updateHistoricoDto);
    
    return this.historicoRepository.save(HistoricoAchado);
  }

  async DeletarHistorico(id: number): Promise<void>{
    const HistoricoAchado = await this.listarHistoricoPorId(id);
    await this.historicoRepository.remove(HistoricoAchado);
  }

}