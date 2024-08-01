import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NODE_ENV } from '../app/constants/app.constants';
import { SnakeNamingStrategy } from '../database/strategies/snake-naming.strategy';
import { AuthenticationSubscriber } from 'src/domain/authentication/subscribers/authentication.subscriber';
import { User } from 'src/domain/user/entities/user.entity';
import { Authentication } from 'src/domain/authentication/entities/authentication.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Authentication],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
  logging: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
  subscribers: [AuthenticationSubscriber],
});
