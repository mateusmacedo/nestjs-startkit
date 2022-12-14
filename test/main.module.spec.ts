import { MainModule } from '@app/main.module'
import { Test } from '@nestjs/testing'

describe('MainModule', () => {
  let mainModule: MainModule

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MainModule],
      controllers: [],
      providers: []
    }).compile()

    mainModule = moduleRef.get<MainModule>(MainModule)
  })

  it('should be defined for dev', () => {
    expect(mainModule).toBeDefined()
  })
})
