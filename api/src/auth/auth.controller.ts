import { Controller, Post, Body, UnauthorizedException, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { Param } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('login')
  async login(@Body() body: { chave: string; senha: string }) {
    const user = await this.authService.validateUser(body.chave, body.senha);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.login(user);
    const role = await this.usuariosService.PegarCargoUsuario(user.id);
    return { ...token, role };
  }

  @Get('role/:id')
  async getRole(@Param('id') id: number) {
    const role = await this.usuariosService.PegarCargoUsuario(id);
    return { role };
  }
}
