import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';
import { Usuario } from '../models/usuario.entity';
import { Gestor } from '../models/gestor.entity';
import { Sede } from '../models/sede.entity';
import { Membro } from '../models/membros.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Gestor, Sede, Membro])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
