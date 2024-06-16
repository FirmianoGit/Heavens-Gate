import { DataSource } from 'typeorm';
import { Membro } from 'src/entities/membros.entity';

export const membroProviders = [
  {
    provide: 'MEMBRO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Membro),
    inject: ['DATA_SOURCE'],
  },
];