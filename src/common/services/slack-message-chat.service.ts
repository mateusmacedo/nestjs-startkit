import { IMessageChat, messageType } from '@app/common/contracts/message-chat.interface'
import { Injectable, Provider } from '@nestjs/common'
import { SlackService } from 'nestjs-slack'

@Injectable()
export class SlackMessageChat implements IMessageChat {
  private _message: any[] = []
  private _channel: string
  constructor(private slack: SlackService) {}

  channel(channel: string): this {
    this._channel = channel
    return this
  }

  header(text: string): this {
    this._message.push({
      type: 'header',
      text: { type: 'plain_text', text, emoji: true }
    })
    return this
  }

  content(type: messageType, text: string): this {
    this._message.push({
      type: 'section',
      text: { type, text }
    })
    return this
  }

  async send() {
    try {
      if (!this._channel) throw new Error('canal não foi setado, use .chanel(YOUR_CHANNEL)')
      await this.slack.postMessage({
        channel: this._channel,
        blocks: this._message
      })
    } catch (e) {
      console.log('erro ao enviar mensagem:', e)
    }
  }
}

export const SlackMessageChatProvider: Provider = {
  provide: 'messageChat',
  useClass: SlackMessageChat
}
