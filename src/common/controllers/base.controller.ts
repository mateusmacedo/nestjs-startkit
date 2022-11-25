import { BaseListResponseDto } from '@app/common/dto/base-list.response.dto'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

@ApiBadRequestResponse({
  description: 'quando os dados da solicitação estão incorretos(erro humano)',
  schema: {
    example: { statusCode: 'BAD_REQUEST', message: ['...'] }
  }
})
@ApiInternalServerErrorResponse({
  description: 'quando houver erro no processamento do lado do servidor.',
  schema: {
    example: { statusCode: 'INTERNAL_SERVER_ERROR', message: 'Ocorreu um erro ao processar a requisição.' }
  }
})
@ApiUnauthorizedResponse({
  description: 'Quando se trata de uma rota que necessita login, porém não é enviado o token de acesso.',
  schema: {
    example: { statusCode: 'UNAUTHORIZED', message: 'Unauthorized' }
  }
})
export abstract class BaseController {
  abstract list(filters?: Partial<any>): Promise<BaseListResponseDto>

  abstract find(filters: string | number): Promise<any>

  abstract create(data: Partial<any>): Promise<any>

  abstract update(id: string | number, data: Partial<any>): Promise<any>

  abstract remove(id: string | number): Promise<any>

  abstract partialUpdate(id, data): Promise<any>
}
