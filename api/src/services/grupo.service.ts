import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from '../common/dto/grupo/create-grupo.dto';
import { UpdateGrupoDto } from '../common/dto/grupo/update-grupo.dto';
import { Grupo } from '../entities/grupo.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class GrupoService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('GRUPO_REPOSITORY')
    private grupoRepository: Repository<Grupo>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async listarGrupos(): Promise<Grupo[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.grupoRepository.find()
  }

  async listarGrupoPorId(id: number): Promise<Grupo>{

    const options: FindOneOptions<Grupo> = {
      where: { id: id },
    };
    
    const GrupoEncontrado = this.grupoRepository.findOne(options)

    if(!GrupoEncontrado){

      throw new NotFoundException(`Grupo com o id ${id} não encontrado`)
    }

    return GrupoEncontrado
  }


  async criarGrupo(createGrupoDto: CreateGrupoDto): Promise<Grupo>{
    try{
      const NovoGrupo = this.grupoRepository.create(createGrupoDto);
      return this.grupoRepository.save(NovoGrupo)
    }
    catch{
      throw new NotAcceptableException(`O grupo não pode ser criado, verifique se as informações estão corretas`)
    }
  } 

  
  async modificarGrupo(id:number, updateGrupoDto: UpdateGrupoDto): Promise<Grupo>{
    
    const GrupoAchado = await this.listarGrupoPorId(id);

    this.grupoRepository.merge(GrupoAchado, updateGrupoDto);
    
    return this.grupoRepository.save(GrupoAchado)
  }

async DeletarGrupo(id: number): Promise<void>{
  const GrupoAchado = await this.listarGrupoPorId(id);
  await this.grupoRepository.remove(GrupoAchado);
}

}
