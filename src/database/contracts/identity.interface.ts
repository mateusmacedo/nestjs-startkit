import { TIdentity } from '@app/database/contracts/entity.types'

export interface IIdentityGenerator {
  generateIdentity(): TIdentity
}
