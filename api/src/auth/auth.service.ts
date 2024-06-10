import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../services/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(chave: string, senha: string): Promise<any> {
    const user = await this.usuariosService.ListarUsuarioPorLogin(chave);
    if (user && user.senha === senha) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.chave, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: user.id,
    };
  }
}
