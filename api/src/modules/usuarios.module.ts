import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';
import { Usuario } from '../entities/usuario.entity';
import { Gestor } from '../entities/gestor.entity';
import { Sede } from '../entities/sede.entity';
import { Membro } from '../entities/membros.entity';
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
