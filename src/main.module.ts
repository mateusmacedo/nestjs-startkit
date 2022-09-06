import { appConfig } from '@/common/config/app.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from '@/common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: '.env',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true
    }),
    ConfigModule.forFeature(appConfig()),
    CommonModule
  ]
})
export class MainModule {}
