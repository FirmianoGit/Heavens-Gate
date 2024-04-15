import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { membroModule } from './membros.module';
import { CongregacaoModule } from './congregacao.module';


@Module({
  imports: [
    membroModule,
    CongregacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
