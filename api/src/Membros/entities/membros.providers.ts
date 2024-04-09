import { DataSource } from 'typeorm';
import { Membros } from './membros.entity';

export const membroProviders = [
  {
    provide: 'MEMBRO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Membros),
    inject: ['DATA_SOURCE'],
  },
];