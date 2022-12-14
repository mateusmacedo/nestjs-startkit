import { databaseConfig } from '@app/database/configs/database.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DatabaseType } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig()),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<DatabaseType>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          entities: [],
          autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'),
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get<boolean>('database.logging'),
          useUnifiedTopology: configService.get<boolean>('database.useUnifiedTopology')
        } as unknown as TypeOrmModuleOptions
      }
    })
  ]
})
export class DatabaseModule {}
