import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { CreateUsuarioDto } from '../common/dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../common/dto/usuario/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

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

  @Put(':id')
  ModificarUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.modificarUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  DeletarUsuario(@Param('id') id: number) {
    return this.usuariosService.DeletarMembro(id);
  }
}
