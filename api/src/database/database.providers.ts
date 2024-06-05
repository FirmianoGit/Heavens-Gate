import { Usuario } from 'src/models/usuario.entity';
import { Congregacao } from 'src/models/congregacao.entity';
import { Evento } from 'src/models/evento.entity';
import { Frequenta } from 'src/models/frequenta.entity';
import { Gestor } from 'src/models/gestor.entity';
import { Grupo } from 'src/models/grupo.entity';
import { Historico } from 'src/models/historico.entity';
import { Membro } from 'src/models/membros.entity';
import { Sede } from 'src/models/sede.entity';
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