import { Module } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { usuarioProviders } from 'src/providers/usuario.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [
    ...usuarioProviders,
    UsuariosService],
})
export class UsuariosModule {}
