import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { CreateUsuarioDto } from '../common/dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../common/dto/usuario/update-usuario.dto';
import { IsPublic } from 'src/auth/Decorators/is-public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @IsPublic()
  @Post()
  CriarUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.listarUsuarios();
  }

  @Get(':id')
  ListarUsuarioPorId(@Param('id') id: number) {
    return this.usuariosService.listarUsuarioPorId(id);
  }

  @Get(':id/role')
  async getRole(@Param('id') id: number) {
    const role = await this.usuariosService.PegarCargoUsuario(id);
    return { role };
  }
  
  @Get(':string/chave')
  async PegarUsuarioPorLogin(@Param('string') chave: string) {
    return this.usuariosService.ListarUsuarioPorLogin(chave);
  }

  @Put(':id')
  ModificarUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.modificarUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  DeletarUsuario(@Param('id') id: number) {
    return this.usuariosService.deletarUsuario(id);
  }
}
