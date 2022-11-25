import { LoggerInterface } from '@app/common/contracts/native-logger.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NativeLogger implements LoggerInterface {
  error(content: any, optionalParams?: any): void {
    this.log('error', content, optionalParams)
  }

  warn(content: any, optionalParams?: any): void {
    this.log('warn', content, optionalParams)
  }

  info(content: any, optionalParams?: any): void {
    this.log('info', content, optionalParams)
  }

  private log(level: string, content: any, optionalParams: any) {
    let log = {
      date: new Date().toISOString(),
      level: level,
      content: content
    }

    if (optionalParams) {
      log = { ...log, ...optionalParams }
    }

    console.log(JSON.stringify(log))
  }
}
