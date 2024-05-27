import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { DatabaseModule } from 'src/database/database.module';
import { grupoProviders } from 'src/providers/grupo..provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GrupoController],
  providers: [
    ...grupoProviders,
    GrupoService],
})
export class GrupoModule {}
