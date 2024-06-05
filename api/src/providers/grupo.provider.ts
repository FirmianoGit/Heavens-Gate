import { DataSource } from 'typeorm';
import { Grupo } from 'src/models/grupo.entity';

export const grupoProviders = [
  {
    provide: 'GRUPO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Grupo),
    inject: ['DATA_SOURCE'],
  },
];