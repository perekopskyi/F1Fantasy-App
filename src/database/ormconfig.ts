import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import entities from '../typeorm';
config();

const OPTIONS = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities,
  migrations: ['/src/database/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: false,
} as DataSourceOptions;

export const AppDataSource = new DataSource(OPTIONS);
