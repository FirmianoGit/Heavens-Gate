import { DataSource } from 'typeorm';
import { Sede } from 'src/entities/sede.entity';

export const sedeProviders = [
  {
    provide: 'SEDE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Sede),
    inject: ['DATA_SOURCE'],
  },
];