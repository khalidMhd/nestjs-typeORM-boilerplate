// database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
  database: configService.get('TYPEORM_DATABASE'),
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
});
