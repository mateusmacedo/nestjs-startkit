import { CommonModule } from '@app/common/common.module'
import { DatabaseModule } from '@app/database/database.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: ['production', 'staging'].includes(process.env.NODE_ENV),
      expandVariables: ['production', 'staging'].includes(process.env.NODE_ENV),
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      cache: true,
      isGlobal: true
    }),
    CommonModule,
    DatabaseModule
  ]
})
export class MainModule {}
