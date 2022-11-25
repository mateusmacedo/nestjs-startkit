import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'dotenv'

const envConfig = parse(readFileSync(join(__dirname, '..', '.env.test')))

for (const key in envConfig) {
  if (!envConfig[key].startsWith('$')) {
    process.env[key] = envConfig[key]
  }
}
