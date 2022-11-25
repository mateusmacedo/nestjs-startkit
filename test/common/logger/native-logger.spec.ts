import { NativeLogger } from '@app/common/services/native-logger.service'

console.log = jest.fn()

afterAll(() => {
  jest.useRealTimers()
})

afterEach(() => {
  jest.clearAllMocks()
})

beforeAll(() => {
  jest.useFakeTimers({ now: new Date() })
  jest.setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
})
const DateAtual = '2022-01-01T00:00:00.000Z'

describe('Native logger test', () => {
  it('should print formatted log', () => {
    const expected = `{"date":"${DateAtual}","level":"info","content":"testing log"}`

    const logger = new NativeLogger()
    logger.info('testing log')

    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(expected)
  })

  it('should print formatted log with optional parameters', () => {
    const expected = `{"date":"${DateAtual}","level":"info","content":"testing log","test":true}`

    const logger = new NativeLogger()
    logger.info('testing log', { test: true })

    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(expected)
  })

  it('should log all when level is "all"', () => {
    const logger = new NativeLogger()

    logger.error('testing log')
    logger.warn('testing log')
    logger.info('testing log')

    expect(console.log).toBeCalledTimes(3)
  })

  const errorLogLevelsProvider = [
    { level: 'info', times: 1 },
    { level: 'error', times: 1 },
    { level: 'warn', times: 1 }
  ]

  describe.each(errorLogLevelsProvider)('Should log "error" in correct levels', (config) => {
    it(`should${config.times == 0 ? ' not ' : ' '}log "error" when level is "${config.level}"`, () => {
      const logger = new NativeLogger()

      logger.error('testing log')

      expect(console.log).toBeCalledTimes(config.times)
    })
  })

  const warnLogLevelsProvider = [
    { level: 'error', times: 1 },
    { level: 'warn', times: 1 },
    { level: 'info', times: 1 }
  ]

  describe.each(warnLogLevelsProvider)('Should log "warn" in correct levels', (config) => {
    it(`should${config.times == 0 ? ' not ' : ' '}log "warn" when level is "${config.level}"`, () => {
      const logger = new NativeLogger()
      logger.warn('testing log')

      expect(console.log).toBeCalledTimes(config.times)
    })
  })

  const infoLogLevelsProvider = [
    { level: 'error', times: 1 },
    { level: 'warn', times: 1 },
    { level: 'info', times: 1 }
  ]

  describe.each(infoLogLevelsProvider)('Should log "info" in correct levels', (config) => {
    it(`should${config.times == 0 ? ' not ' : ' '}log "info" when level is "${config.level}"`, () => {
      const logger = new NativeLogger()
      logger.info('testing log')

      expect(console.log).toBeCalledTimes(config.times)
    })
  })
})
