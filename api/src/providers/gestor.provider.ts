import { DataSource } from 'typeorm';
import { Gestor } from '../models/gestor.entity';

export const gestorProviders = [
  {
    provide: 'GESTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Gestor),
    inject: ['DATA_SOURCE'],
  },
];