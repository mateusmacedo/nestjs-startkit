import { HealthController } from '@/common/controllers/health.controller'
import { HealthService } from '@/common/services/health.service'
import { appConfig } from '@/common/configs/app.config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [ConfigModule.forFeature(appConfig()), HttpModule, TerminusModule],
  controllers: [HealthController],
  providers: [HealthService]
})
export class CommonModule {}
