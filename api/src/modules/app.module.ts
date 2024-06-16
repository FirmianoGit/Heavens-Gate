import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../services/app.service';
import { membroModule } from './membros.module';
import { CongregacaoModule } from './congregacao.module';
import { GestorModule } from './gestor.module';
import { SedeModule } from './sede.module';
import { UsuariosModule } from 'src/modules/usuarios.module';
import { HistoricoModule } from 'src/modules/historico.module';
import { GrupoModule } from './grupo.module';
import { FrequentaModule } from './frequenta.module';
import { EventoModule } from './evento.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'heavenpath',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    membroModule,
    CongregacaoModule,
    GestorModule,
    SedeModule,
    UsuariosModule,
    HistoricoModule,
    GrupoModule,
    FrequentaModule,
    EventoModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
