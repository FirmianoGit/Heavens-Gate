import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../common/dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../common/dto/usuario/update-usuario.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Usuario } from '../models/usuario.entity';

@Injectable()
export class UsuariosService {
  //CONSTRUTOR FAZENDO A INJEÇÃO DE DEPENDENCIA DO PROVIDER
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  //FUNÇÃO QUE RETORNA TODAS AS ENTIDADES DO TIPO MEMBRO PERSISTIDAS
  async listarUsuarios(): Promise<Usuario[]> {

    //RETORNO DE TODAS AS ENTIDADES QUE ESTAO NO BANCO DE DADOS 
    return await this.usuarioRepository.find()
  }

  async listarUsuarioPorId(id: number): Promise<Usuario>{

    const options: FindOneOptions<Usuario> = {
      where: { id: id },
    };
    
    const UsuarioEncontrado = this.usuarioRepository.findOne(options)

    if(!UsuarioEncontrado){

      throw new NotFoundException(`Usuario com o id ${id} não encontrado`)
    }

    return UsuarioEncontrado
  }

  async criarUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
    try{
      const NovoUsuario = this.usuarioRepository.create(createUsuarioDto);
      return this.usuarioRepository.save(NovoUsuario)
    }
    catch{
      throw new NotAcceptableException(`O usuario não pode ser criado, verifique se as informações estão corretas`)
    }
  } 

  async modificarUsuario(id:number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>{
    
    const UsuarioAchado = await this.listarUsuarioPorId(id);

    this.usuarioRepository.merge(UsuarioAchado, updateUsuarioDto);
    
    return this.usuarioRepository.save(UsuarioAchado)
  }

  async DeletarMembro(id: number): Promise<void>{
    const UsuarioAchado = await this.listarUsuarioPorId(id);
    await this.usuarioRepository.remove(UsuarioAchado);
  }

}
