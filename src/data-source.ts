import { DataSource } from 'typeorm';
import configuration from './config/configuration';

const dataSource = new DataSource(configuration().database);
export default dataSource;
