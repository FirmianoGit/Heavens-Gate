import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from '../common/dto/evento/create-evento.dto';
import { UpdateEventoDto } from '../common/dto/evento/update-evento.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Evento } from 'src/entities/evento.entity';
import { Gestor } from 'src/entities/gestor.entity';

@Injectable()
export class EventoService {

  constructor(
    @Inject('EVENTO_REPOSITORY')
    private readonly eventoRepository: Repository<Evento>,
    @Inject('GESTOR_REPOSITORY')
    private readonly gestorRepository: Repository<Gestor>
  ) {}

  async CriarEvento(createEventoDto: CreateEventoDto): Promise<Evento> {

    try{
    const EventoCriado = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(EventoCriado);
    }
    catch{
      throw new HttpException('Não foi possivel criar o evento', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getEventosPorGestorDeSede(gestorId: number): Promise<Evento[]> {
    try {
      // Verifica se o gestor existe
      const gestor = await this.gestorRepository.findOne({ where: { id: gestorId } });
      if (!gestor) {
        throw new NotFoundException(`Gestor com id ${gestorId} não encontrado`);
      }

      // Busca os eventos associados às congregações geridas pelo gestor
      const eventos = await this.eventoRepository.find({ where: { congregacao: { gestorId } } });
      return eventos;
    } catch (error) {
      // Logging de erro, se necessário
      throw new InternalServerErrorException('Erro ao listar eventos');
    }
  }

  async listarEventosParaGestorDeSede(): Promise<Evento[]> {
    return this.eventoRepository.find({ relations: ['congregacao'] });
  }

  async listarEventosParaGestor(congregacaoId: number): Promise<Evento[]> {
    return this.eventoRepository.find({
      where: { congregacaoId }
    });
  }

  async ListarEventos(): Promise<Evento[]> {
    const ListaEventos = await this.eventoRepository.find();
    if(!ListaEventos){
      throw new HttpException('Não foi possivel achar os eventos', HttpStatus.NOT_FOUND)
    }
    return ListaEventos;
  }

  ListarEventoPorId(id: number) {
    const options: FindOneOptions<Evento> =  
    {where: { id: id }
  };
    const EventoEncontrado = this.eventoRepository.findOne(options);

    if(!EventoEncontrado){
      throw new HttpException(`Evento com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }
    return EventoEncontrado;
  }

  async ModificarEvento(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    try{
    const EventoAchado = await this.ListarEventoPorId(id);

    if(!EventoAchado){
      throw new HttpException(`O Id passado não existe no sistema`, HttpStatus.NOT_FOUND)
    }

    this.eventoRepository.merge(EventoAchado, updateEventoDto);
    return this.eventoRepository.save(EventoAchado);
    
  } catch{
    throw new HttpException('Algo deu errado, request não concluida', HttpStatus.INTERNAL_SERVER_ERROR)
  }
  }

  async RemoverEvento(id: number): Promise<void> {
    const EventoAchado = await this.ListarEventoPorId(id);
    await this.eventoRepository.remove(EventoAchado);
  }
}
