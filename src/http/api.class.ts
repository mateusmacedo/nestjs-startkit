import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'

export abstract class API {
  protected baseUrl: string
  private axiosInstance: AxiosInstance

  constructor(baseUrl: string, axiosConfig?: CreateAxiosDefaults) {
    this.baseUrl = baseUrl
    this.axiosInstance = axios.create(axiosConfig)
    this.enableInterceptors()
  }
  private enableInterceptors() {
    // Here's where you can define common refetching logic
  }

  // Common "get" logic
  protected get<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(`${this.baseUrl}/${url}`, {
      headers: requestConfig?.headers ? requestConfig.headers : {},
      params: requestConfig.params ? requestConfig.params : null
    })
  }

  // Common "post" logic
  protected post<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(`${this.baseUrl}/${url}`, {
      headers: requestConfig?.headers ? requestConfig.headers : {},
      params: requestConfig.params ? requestConfig.params : null
    })
  }
}
