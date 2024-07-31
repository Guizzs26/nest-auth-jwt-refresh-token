import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { configSchema } from './configuration/config.schema';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
