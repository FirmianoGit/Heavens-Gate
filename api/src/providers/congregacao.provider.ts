import { DataSource } from 'typeorm';
import { Congregacao } from '../entities/congregacao.entity';

export const congregacaoProviders = [
  {
    provide: 'CONGREGACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Congregacao),
    inject: ['DATA_SOURCE'],
  },
];