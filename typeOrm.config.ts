import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'mysql',
  host: configService.get('SQL_DB_HOST'),
  port: configService.get('SQL_DB_PORT'),
  username: configService.get('SQL_DB_USERNAME'),
  password: configService.get('SQL_DB_PASSWORD'),
  database: configService.get('SQL_DATABASE'),
  entities: [],
  migrations: ['src/database/migrations/*.ts']
})
