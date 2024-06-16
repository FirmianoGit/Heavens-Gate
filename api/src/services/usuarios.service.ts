import { Injectable, NotFoundException, NotAcceptableException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Gestor } from '../entities/gestor.entity';
import { Sede } from '../entities/sede.entity';
import { Membro } from '../entities/membros.entity';
import { CreateUsuarioDto } from '../common/dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../common/dto/usuario/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,

    @Inject('GESTOR_REPOSITORY')
    private gestorRepository: Repository<Gestor>,

    @Inject('SEDE_REPOSITORY')
    private sedeRepository: Repository<Sede>,

    @Inject('MEMBRO_REPOSITORY')
    private membroRepository: Repository<Membro>,
  ) {}

  async listarUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async listarUsuarioPorId(id: number): Promise<Usuario> {
    const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuarioEncontrado) {
      throw new NotFoundException(`Usuario com o id ${id} não encontrado`);
    }
    return usuarioEncontrado;
  }

  async criarUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const novoUsuario : Usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        senha: await bcrypt.hash(createUsuarioDto.senha, 10)
      });
      this.usuarioRepository.save(novoUsuario);
      return {
        ...novoUsuario,
        senha: undefined
      }
    } catch {
      throw new NotAcceptableException(`O usuario não pode ser criado, verifique se as informações estão corretas`);
    }
  }

  async modificarUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioAchado = await this.listarUsuarioPorId(id);
    this.usuarioRepository.merge(usuarioAchado, updateUsuarioDto);
    return this.usuarioRepository.save(usuarioAchado);
  }

  async deletarUsuario(id: number): Promise<void> {
    const usuarioAchado = await this.listarUsuarioPorId(id);
    await this.usuarioRepository.remove(usuarioAchado);
  }

  async ListarUsuarioPorLogin(chave: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { chave } });
  }

  async PegarCargoUsuario(id: number): Promise<string> {
    const gestor = await this.gestorRepository.findOne({ where: { usuarioId: id } });
    if (gestor) {
      const sede = await this.sedeRepository.findOne({ where: { gestorId: gestor.id } });
      return sede ? 'Gestor de Sede' : 'Gestor';
    }
    const membro = await this.membroRepository.findOne({ where: { usuarioId: id } });
    return membro ? 'Membro' : 'Unknown';
  }
}
