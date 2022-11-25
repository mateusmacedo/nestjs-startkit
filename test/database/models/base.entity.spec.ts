import { BaseEntity } from '@app/database/models/base.entity'

describe('BaseEntity', () => {
  class TestEntity extends BaseEntity {}
  let sut: TestEntity
  beforeEach(() => {
    sut = new TestEntity()
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
    expect(sut).toBeInstanceOf(BaseEntity)
  })
})
