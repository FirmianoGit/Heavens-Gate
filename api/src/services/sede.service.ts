import { HttpException, HttpStatus, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateSedeDto } from '../common/dto/Sede/create-sede.dto';
import { UpdateSedeDto } from '../common/dto/Sede/update-sede.dto';
import { Repository } from 'typeorm';
import { Sede } from 'src/entities/sede.entity';

@Injectable()
export class SedeService {

  constructor(
    @Inject('SEDE_REPOSITORY')
    private sedeRepository: Repository<Sede>
  ) {}

  async CriarSede(createSedeDto: CreateSedeDto): Promise<Sede> {  
    try{
      const novaSede = this.sedeRepository.create(createSedeDto);
      return this.sedeRepository.save(novaSede)
    }
    catch{
      throw new NotAcceptableException(`A sede não pode ser criada, verifique se as informações estão corretas`)
    }
  }

  async ListarSedePorId(id: number): Promise<Sede> {
    
      const SedeAchada = await this.sedeRepository.findOneBy({id: id});

      if(!SedeAchada){
        throw new HttpException(`A sede não foi encontrada, verifique se as informações estão corretas`, HttpStatus.NOT_FOUND);
      }

      return SedeAchada
      
    
  }

  async ListarSedes(): Promise<Sede[]> {
    try{
      return await this.sedeRepository.find();
    }
    catch{
      throw new HttpException(`A sede não foi encontrada, verifique se as informações estão corretas`, HttpStatus.NOT_FOUND);
    }
  }

  async ModificarSede(id: number, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    try{
      const SedeAchada = await this.ListarSedePorId(id);

      this.sedeRepository.merge(SedeAchada, updateSedeDto);
      
      return this.sedeRepository.save(SedeAchada)
    }
    catch{
      throw new HttpException(`Algo deu errado`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async DeletarSede(id: number): Promise<Sede> {
  const SedeAchada = await this.ListarSedePorId(id);
  const teste = SedeAchada;

  if(!SedeAchada){
    throw new HttpException('Sede não encontrada', HttpStatus.NOT_FOUND);
  }
  await this.sedeRepository.remove(SedeAchada);
  return teste;
  }
}
