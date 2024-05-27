import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { membroModule } from './membros.module';
import { CongregacaoModule } from './congregacao.module';
import { GestorModule } from './gestor.module';
import { SedeModule } from './sede.module';
import { UsuariosModule } from 'src/modules/usuarios.module';
import { HistoricoModule } from 'src/modules/historico.module';
import { GrupoModule } from 'src/grupo/grupo.module';


@Module({
  imports: [
    membroModule,
    CongregacaoModule,
    GestorModule,
    SedeModule,
    UsuariosModule,
    HistoricoModule,
    GrupoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
