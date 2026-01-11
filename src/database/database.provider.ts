import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import configuration from '../config/configuration';

export const DATA_SOURCE = 'DATA_SOURCE';
export const DatabaseProvider: Provider = {
  provide: DATA_SOURCE,
  useFactory: async (): Promise<DataSource> => {
    const dataSource: DataSource = new DataSource({
      ...configuration().database,
    });

    if (dataSource.isInitialized) {
      return dataSource;
    }

    return dataSource.initialize();
  },
};
