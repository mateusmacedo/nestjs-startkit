import { ApiProperty } from '@nestjs/swagger'

export class BaseListResponseDto {
  @ApiProperty({
    description: 'quantidade de registros por página'
  })
  perPage: number

  @ApiProperty({
    description: 'total de registros listados.'
  })
  totalRows: number
}
