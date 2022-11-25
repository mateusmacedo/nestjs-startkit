import { HttpClientRequest } from '@app/common/http-client/http-client-request'
import { HttpClientResponse } from '@app/common/http-client/http-client-response'
import { HttpStatus } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

export class HttpClient {
  protected readonly axios: AxiosInstance

  public constructor(public readonly baseUrl = '') {
    this.axios = axios.create({
      baseURL: baseUrl,
      validateStatus: (status) => this.isValidStatus(status)
    })
  }

  public async request(request: HttpClientRequest): Promise<HttpClientResponse> {
    const response = await this.axios.request(request)

    return new HttpClientResponse(response.status, response.data, response.headers)
  }

  protected isValidStatus(status: number): boolean {
    return status < HttpStatus.INTERNAL_SERVER_ERROR
  }
}
