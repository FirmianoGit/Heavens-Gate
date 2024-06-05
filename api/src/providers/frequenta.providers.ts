import { DataSource } from 'typeorm';
import { Frequenta } from '../models/frequenta.entity';

export const frequentaProviders = [
  {
    provide: 'FREQUENTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Frequenta),
    inject: ['DATA_SOURCE'],
  },
];