import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { configSchema } from './shared/configuration/config.schema';

import { DatabaseModule } from './shared/database/database.module';

import { UsersModule } from './domain/user/user.module';
import { AuthenticationModule } from './domain/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
      validationSchema: configSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
