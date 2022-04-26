import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '4dri4n0l3k5',
  database: 'appointments',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
