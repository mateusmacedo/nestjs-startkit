import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsPositive } from 'class-validator'

export class BaseListRequestDto {
  @ApiProperty({
    description: 'Página',
    required: false
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page?: number

  @ApiProperty({
    description: 'quantidade de registros por página',
    default: 10,
    required: false
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  perPage?: number
}
