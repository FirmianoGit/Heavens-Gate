import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';
import { Usuario } from '../models/usuario.entity';
import { Gestor } from '../models/gestor.entity';
import { Sede } from '../models/sede.entity';
import { Membro } from '../models/membros.entity';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from 'src/providers/usuario.provider';
import { gestorProviders } from 'src/providers/gestor.provider';
import { membroProviders } from 'src/providers/membros.providers';
import { sedeProviders } from 'src/providers/sede.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [
    ...gestorProviders,
    ...usuarioProviders,
    ...membroProviders,
    ...sedeProviders,
    UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
