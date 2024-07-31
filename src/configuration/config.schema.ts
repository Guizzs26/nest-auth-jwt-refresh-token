import * as Joi from '@hapi/joi';

import { NODE_ENV } from 'src/app/constants/app.constants';

export const configSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .required()
    .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION)
    .default(NODE_ENV.DEVELOPMENT),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
