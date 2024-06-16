import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosService } from 'src/services/usuarios.service';
import { UserPayload } from './Auth-models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './Auth-models/UserToken';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsuariosService, 
    private readonly jwtservice: JwtService) {}

  async ValidarUsuario(chave: string, senha: string) {
    const Usuario = await this.userService.ListarUsuarioPorLogin(chave);

    if (Usuario) {
      const SenhaValida = await bcrypt.compare(senha, Usuario.senha);
      if (SenhaValida) {
        return {
          ...Usuario,
          senha: undefined,
        };
      }
    }
    throw new UnauthorizedException('Endereço de email ou senha inseridos estão incorretos!');
  }

  async login(usuario: Usuario): Promise<UserToken> {
    const payload: UserPayload = {
        sub: usuario.id,
        chave: usuario.chave,
    };

    const JwtToken = this.jwtservice.sign(payload);
    return {
      access_token: JwtToken
    }
  }
}
