import * as nock from 'nock'

global.afterAll(() => {
  if (typeof global.gc === 'function') {
    global.gc()
  }

  nock.cleanAll()
  nock.restore()
})
