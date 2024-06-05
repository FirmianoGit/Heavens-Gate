import { DataSource } from 'typeorm';
import { Evento } from '../models/evento.entity';

export const eventoProviders = [
  {
    provide: 'EVENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Evento),
    inject: ['DATA_SOURCE'],
  },
];