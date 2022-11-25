export interface LoggerInterface {
  info(content: any, optionalParams?: any): void

  error(content: any, optionalParams?: any): void

  warn(content: any, optionalParams?: any): void
}
