import './module.alias'
import { UserModule } from '@app/user/user.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(UserModule)
  await app.listen(3000)
}
bootstrap()
