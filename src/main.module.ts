import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from '@/common/config/app.config'
import { HealthController } from '@/common/controller/health.controller'
import { HealthService } from '@/common/service/health.service'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: '.env',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true
    }),
    ConfigModule.forFeature(appConfig()),
    HttpModule,
    TerminusModule
  ],
  controllers: [HealthController],
  providers: [HealthService]
})
export class MainModule {}
