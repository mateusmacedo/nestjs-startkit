import { IMessageChat } from '@app/common/message-chat/message-chat.interface'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject('messageChat') private messageChat: IMessageChat) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus()

    if (status == 401) {
      response.status(401).json({ statusCode: 401, message: 'Token expirado. Realizar login novamente.' })
      return
    }

    if (status.toString().match(/^5/)) {
      if (process.env?.NODE_ENV != 'development') {
        const { headers, body, query, path, method } = request
        this.sendErrorToChatMessage(exception?.cause?.stack, JSON.stringify({ headers, body, query, path, method }))
      }

      let responseMessage: Partial<any> = { message: 'Ocorreu um erro ao processar a requisição.' }
      if (process.env?.NODE_ENV == 'development') {
        console.log(exception)
        responseMessage = { ...responseMessage, error: exception?.cause?.toString() }
      }
      response.status(status).json(responseMessage)
      return
    }
    response.status(status).json(exception.getResponse())
  }

  private sendErrorToChatMessage(exception, requestData?: string) {
    const message: IMessageChat = this.messageChat
      .channel(process.env?.CHAT_CHANNEL_NOTIFY_EXCEPTION)
      .header(`:rotating_light: Erro interno em ${process.env?.NODE_ENV} :rotating_light:`)
      .content('mrkdwn', `*Houve um problema ao processar a requisição:*`)
      .content('mrkdwn', `erro:\n \`\`\` ${exception} \`\`\``)

    if (requestData) message.content('mrkdwn', `request:\n \`\`\` ${requestData} \`\`\``)

    message.send()
  }
}
