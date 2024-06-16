import { Usuario } from 'src/entities/usuario.entity';
import { Congregacao } from 'src/entities/congregacao.entity';
import { Evento } from 'src/entities/evento.entity';
import { Frequenta } from 'src/entities/frequenta.entity';
import { Gestor } from 'src/entities/gestor.entity';
import { Grupo } from 'src/entities/grupo.entity';
import { Historico } from 'src/entities/historico.entity';
import { Membro } from 'src/entities/membros.entity';
import { Sede } from 'src/entities/sede.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'heavenpath',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
            Membro,
            Congregacao,
            Evento,
            Frequenta,
            Gestor,
            Grupo,
            Historico,
            Sede,
            Usuario
            
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];