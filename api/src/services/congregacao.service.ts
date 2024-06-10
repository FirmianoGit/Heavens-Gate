import { Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Congregacao } from 'src/models/congregacao.entity';
import { CreateCongregacaoDto } from '../common/dto/congregacao/create-congregacao.dto';
import { UpdateCongregacaoDto } from '../common/dto/congregacao/update-congregacao.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Gestor } from 'src/models/gestor.entity';
import { Membro } from 'src/models/membros.entity';
import { Evento } from 'src/models/evento.entity';
import { EventoModule } from 'src/modules/evento.module';

@Injectable()
export class CongregacaoService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('CONGREGACAO_REPOSITORY')
    private congregacaoRepository: Repository<Congregacao>,
    @Inject('GESTOR_REPOSITORY')
    private gestorRepository: Repository<Gestor>,
    @Inject('MEMBRO_REPOSITORY')
    private membroRepository: Repository<Membro>,
    @Inject('EVENTO_REPOSITORY')
    private eventoRepository: Repository<Evento>,
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

  async ListarCongregacoesPorIdDoGestor(id: number): Promise<Congregacao[]> {
    try {
      // Verifica se o gestor existe
      const gestor = await this.gestorRepository.findOne({ where: { id } });
      if (!gestor) {
        throw new NotFoundException(`Gestor com id ${id} não encontrado`);
      }

      // Busca as congregações associadas ao gestor
      const congregacoes = await this.congregacaoRepository.findBy({ gestorId: id });
      
      return congregacoes;
    } catch (error) {
      // Logging de erro
      throw new InternalServerErrorException('Erro ao listar congregações');
    }
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

  
  async ModificarCongregacao(id:number, updateCongregacaoDto: UpdateCongregacaoDto): Promise<Congregacao>{
    
    const congregacaoAchada = await this.ListarCongregacoesPorId(id);

    this.congregacaoRepository.merge(congregacaoAchada, updateCongregacaoDto);
    
    return this.congregacaoRepository.save(congregacaoAchada);
  }

  async DeletarCongregacao(id: number): Promise<void>{
    const congregacaoAchada = await this.ListarCongregacoesPorId(id);
    await this.congregacaoRepository.remove(congregacaoAchada);
  }

  async ListarMembros(id: number): Promise<Membro[]> {
    try {
      // Verifica se a congregação existe
      const congregacao = await this.congregacaoRepository.findOne({ where: { id } });
      if (!congregacao) {
        throw new NotFoundException(`Congregação com id ${id} não encontrada`);
      }

      // Busca os membros associados à congregação
      const membros = await this.membroRepository.findBy({ congregacaoId: id });
      return membros;
    } catch (error) {
      // Logging de erro
      throw new InternalServerErrorException('Erro ao listar membros');
    }
  }
  async ListarEventos(id: number): Promise<Evento[]> {
    try {
      // Verifica se a congregação existe
      const congregacao = await this.congregacaoRepository.findOne({ where: { id } });
      if (!congregacao) {
        throw new NotFoundException(`Congregação com id ${id} não encontrada`);
      }
      // Busca os eventos associados à congregação
      const eventos = await this.eventoRepository.findBy({ congregacaoId: id });
      return eventos;
    } catch (error) {
      // Logging de erro
      throw new InternalServerErrorException('Erro ao listar eventos');
    }
  }
}
