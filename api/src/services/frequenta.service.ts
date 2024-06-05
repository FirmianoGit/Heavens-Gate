import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateFrequentaDto } from '../common/dto/frequenta/create-frequenta.dto';
import { UpdateFrequentaDto } from '../common/dto/frequenta/update-frequenta.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Frequenta } from '../models/frequenta.entity';

@Injectable()
export class FrequentaService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('FREQUENTA_REPOSITORY')
    private frequentaRepository: Repository<Frequenta>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async listarFrequencia(): Promise<Frequenta[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.frequentaRepository.find()
  }

  async listarFrequenciaPorId(id: number): Promise<Frequenta>{

    const options: FindOneOptions<Frequenta> = {
      where: { membroId: id },
    };
    
    const FrequenciaEncontrada = this.frequentaRepository.findOne(options)

    if(!FrequenciaEncontrada){

      throw new NotFoundException(` O membro com o id ${id} não participou de nenhum evento`)
    }

    return FrequenciaEncontrada
  }

  async criarFrequencia(createFrequenciaDto: CreateFrequentaDto ): Promise<Frequenta>{
    try{
      const NovaFrequencia = this.frequentaRepository.create(createFrequenciaDto);
      return this.frequentaRepository.save(NovaFrequencia)
    }
    catch{
      throw new NotAcceptableException(`A frequencia não pode ser criada, verifique se as informações estão corretas`)
    }
  } 

  
  async modificarFrequencia(id:number, updateFrequenciaDto: UpdateFrequentaDto): Promise<Frequenta>{
    
    const FrequenciaAchada = await this.listarFrequenciaPorId(id);

    this.frequentaRepository.merge(FrequenciaAchada, updateFrequenciaDto);
    
    return this.frequentaRepository.save(FrequenciaAchada)
  }

  async DeletarFrequencia(id: number): Promise<void>{
    const FrequenciaAchada = await this.listarFrequenciaPorId(id);
    await this.frequentaRepository.remove(FrequenciaAchada);
  }

}
