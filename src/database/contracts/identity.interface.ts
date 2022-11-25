import { TIdentity } from '@/database/contracts/entity.types'

export interface IIdentityGenerator {
  generateIdentity(): TIdentity
}
