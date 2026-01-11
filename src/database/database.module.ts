import { Global, Module } from '@nestjs/common';
import { DATA_SOURCE, DatabaseProvider } from './database.provider';

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DATA_SOURCE],
})
export class DatabaseModule {}
