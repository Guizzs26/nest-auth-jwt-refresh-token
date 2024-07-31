import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { configSchema } from './shared/configuration/config.schema';

import { DatabaseModule } from './shared/database/database.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
