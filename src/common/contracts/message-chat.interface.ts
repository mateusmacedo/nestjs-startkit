export type messageType = 'mrkdwn' | 'plain_text'
export interface IMessageChat {
  channel(channel: string)
  header(text: string): this
  content(type: messageType, text: string): this
  send()
}
