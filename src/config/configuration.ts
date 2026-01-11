import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10) || 5432,
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'studio_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  cache: true,
};
export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: databaseConfig,
});
