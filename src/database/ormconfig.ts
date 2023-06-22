import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const OPTIONS = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  logging: true,
  synchronize: false,
} as DataSourceOptions;

export const connectionSource = new DataSource(OPTIONS);
