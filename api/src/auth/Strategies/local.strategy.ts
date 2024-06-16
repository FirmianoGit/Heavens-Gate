import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'chave' });
  }

  async validate(chave: string, senha: string): Promise<any> {
    const user = await this.authService.ValidarUsuario(chave, senha);
    return user;  
  }
}
