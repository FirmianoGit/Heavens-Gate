import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGestorDto } from '../common/dto/gestor/create-gestor.dto';
import { UpdateGestorDto } from '../common/dto/gestor/update-gestor.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Gestor } from 'src/entities/gestor.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PipelinePromise } from 'stream';

@Injectable()
export class GestorService {

  constructor(
    @Inject('GESTOR_REPOSITORY')
    private readonly gestorRepository: Repository<Gestor>
  ) {}

  async CriarGestor(createGestorDto: CreateGestorDto): Promise<Gestor> {

    try{
    const GestorCriado = this.gestorRepository.create(createGestorDto);
    return this.gestorRepository.save(GestorCriado);
    }
    catch{
      throw new HttpException('Não foi possivel criar o cadastro', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async ListarGestores(): Promise<Gestor[]> {
    const ListaGestores = await this.gestorRepository.find();
    if(!ListaGestores){
      throw new HttpException('Não foi possivel achar os gestores', HttpStatus.NOT_FOUND)
    }
    return ListaGestores;
  }

  ListarGestorPorId(id: number) {
    const options: FindOneOptions<Gestor> =  
    {where: { id: id }
  };
    const CongregacaoEncontrada = this.gestorRepository.findOne(options);

    if(!CongregacaoEncontrada){
      throw new HttpException(`Congregação com id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }
    return CongregacaoEncontrada;
  }

  async ModificarGestor(id: number, updateGestorDto: UpdateGestorDto): Promise<Gestor> {
    try{
    const GestorAchado = await this.ListarGestorPorId(id);

    if(!GestorAchado){
      throw new HttpException(`O Id passado não existe no sistema`, HttpStatus.NOT_FOUND)
    }

    this.gestorRepository.merge(GestorAchado, updateGestorDto);
    return this.gestorRepository.save(GestorAchado);
    
  } catch{
    throw new HttpException('Algo deu errado, request não concluida', HttpStatus.INTERNAL_SERVER_ERROR)
  }
  }

 async RemoverGestor(id: number): Promise<void> {
  const GestorAchado = await this.ListarGestorPorId(id);
  await this.gestorRepository.remove(GestorAchado);
  }
}
