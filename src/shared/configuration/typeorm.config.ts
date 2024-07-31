import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../database/strategies/snake-naming.strategy';
import { NODE_ENV } from '../app/constants/app.constants';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
  logging: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
});
