import { HealthController } from '@app/common/controllers/health.controller'
import { HealthService } from '@app/common/services/health.service'
import { appConfig } from '@app/common/configs/app.config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { SlackMessageChatProvider } from '@app/common/services/slack-message-chat.service'
import { SlackModule } from 'nestjs-slack'

@Module({
  imports: [
    ConfigModule.forFeature(appConfig()),
    HttpModule,
    TerminusModule,
    SlackModule.forRootAsync({
      useFactory: () => ({
        type: 'webhook',
        url: process.env?.CHAT_WEBHOOK_URL
      })
    })
  ],
  controllers: [HealthController],
  providers: [HealthService, SlackMessageChatProvider],
  exports: [HealthService, SlackMessageChatProvider]
})
export class CommonModule {}
