import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'; // Guarda que você precisará implementar para a autenticação local
import { Public } from './public.decorator'; // Decorador para marcar rotas públicas que não requerem autenticação

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard) // Usa o guarda de autenticação local para verificar as credenciais
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() body: any) { // Adapte para a estrutura do seu modelo de usuário
    return this.authService.register(body);
  }
}
