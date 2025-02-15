import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/modules/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './Strategies/local.strategy';
import { JwtStrategy } from './Strategies/jwt.strategy';
//import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo sagrado',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}