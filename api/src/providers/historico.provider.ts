import { DataSource } from 'typeorm';
import { Historico } from '../models/historico.entity';

export const historicoProviders = [
  {
    provide: 'HISTORICO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Historico),
    inject: ['DATA_SOURCE'],
  },
];