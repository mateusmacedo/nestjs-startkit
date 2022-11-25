import { databaseConfig } from '@/database/configs/database.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModuleBuilder } from '@nestjs/testing'

describe('databaseConfig', () => {
  jest.clearAllMocks()
  let configService: ConfigService
  let testingModuleBuilder: TestingModuleBuilder
  beforeEach(() => {
    testingModuleBuilder = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
          cache: false
        }),
        ConfigModule.forFeature(databaseConfig())
      ],
      controllers: [],
      providers: []
    })
  })
  it('should have appropriate db configs', async () => {
    const moduleRef = await testingModuleBuilder.compile()
    configService = moduleRef.get<ConfigService>(ConfigService)
    const configs = configService.get('database')
    expect(configs).toHaveProperty('type')
    expect(configs).toHaveProperty('username')
    expect(configs).toHaveProperty('password')
    expect(configs).toHaveProperty('host')
    expect(configs).toHaveProperty('port')
    expect(configs).toHaveProperty('ssl')
    expect(configs).toHaveProperty('name')
    expect(configs).toHaveProperty('synchronize')
    expect(configs).toHaveProperty('useNewUrlParser')
    expect(configs).toHaveProperty('logging')
    expect(configs).toHaveProperty('autoLoadEntities')
  })
  it('should throw a error if appropriate db configs is not present', async () => {
    const moduleRef = testingModuleBuilder.compile()
    delete process.env.DB_TYPE
    await expect(moduleRef).rejects.toThrow()
  })
})
