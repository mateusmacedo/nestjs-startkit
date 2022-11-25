import { registerAs } from '@nestjs/config'
import Joi from 'joi'

export const databaseConfig = () =>
  registerAs('database', () => {
    const values = {
      type: process.env.DB_TYPE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL,
      name: process.env.DB_NAME,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      useNewUrlParser: process.env.DB_USE_NEW_URL_PARSER === 'true',
      logging: process.env.DB_LOGGING === 'true',
      autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
      url: process.env.DB_URL,
      useUnifiedTopology: process.env.DB_USE_UNIFIED_TOPOLOGY === 'true'
    }
    const schema = Joi.object({
      type: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      host: Joi.string().required(),
      port: Joi.number().required(),
      ssl: Joi.boolean().required(),
      name: Joi.string().required(),
      synchronize: Joi.boolean().required(),
      useNewUrlParser: Joi.boolean().required(),
      logging: Joi.boolean().required(),
      autoLoadEntities: Joi.boolean().required(),
      url: Joi.string().required(),
      useUnifiedTopology: Joi.boolean().required()
    })
    const { error } = schema.validate(values, { abortEarly: false })
    if (error) {
      throw new Error(error.message)
    }
    return values
  })
