import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// synchronize is only for dev because it auto run migration on entity model change
export const typeormConfigOptions: TypeOrmModuleOptions = {
  synchronize: process.env.NODE_ENV === 'development' ? true : false, // false in prod so we can run migration manually
  // synchronize: false,
  dropSchema: false,
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: ['dist/**/*.entity.js'],

  migrationsTableName: 'migration',
  migrations: ['dist/database-config/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database-config/migrations',
  },
};

export const seedsConfigOptions: TypeOrmModuleOptions = {
  ...typeormConfigOptions,
  name: 'seeds',
  migrationsTableName: 'seeds_migrations',
  migrations: ['dist/database-config/seeds/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database-config/seeds/migrations',
  },
};
