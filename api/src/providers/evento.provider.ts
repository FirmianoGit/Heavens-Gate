import { DataSource } from 'typeorm';
import { Evento } from '../entities/evento.entity';

export const eventoProviders = [
  {
    provide: 'EVENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Evento),
    inject: ['DATA_SOURCE'],
  },
];