export type ListProps = {
  perPage?: number
  page?: number
  [key: string]: any
}

export type ReturnProps = {
  statusCode: string
  message?: any
  data?: any
  error?: any
}

export abstract class BaseService {
  constructor(private mainRepo) {}

  errorHandler(statusCode: string, message?: any) {
    return {
      statusCode,
      message
    }
  }

  async list(props?: ListProps): Promise<ReturnProps> {
    try {
      const res = await this.mainRepo.list(props, props?.page, props?.perPage)
      return { statusCode: 'OK', data: res }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }

  async find(_id: string | number): Promise<ReturnProps> {
    try {
      if (this.mainRepo.isValidIdKey(_id) == false) return this.errorHandler('NOT_FOUND')

      const res = await this.mainRepo.findOne({ _id })
      if (!res) return this.errorHandler('NOT_FOUND')

      return { statusCode: 'OK', data: res }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }

  async create(data: Partial<any>): Promise<ReturnProps> {
    try {
      const res = await this.mainRepo.upsert(data)
      return { statusCode: 'CREATED', data: res }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }
  async createMany(data: Partial<any>[]): Promise<ReturnProps> {
    try {
      if (data.length <= 0) return this.errorHandler('BAD_REQUEST', ['não pode inserir array de dados vazio.'])
      const res = await Promise.all(data.map((dt) => this.mainRepo.upsert(dt)))
      return { statusCode: 'CREATED', data: res }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }
  async update(id: number | string, data: Partial<any>): Promise<ReturnProps> {
    try {
      if (this.mainRepo.isValidIdKey(id) == false) return this.errorHandler('BAD_REQUEST', ['Identificador incorreto'])

      const exists = await this.mainRepo.findOne({ _id: id })
      if (!exists) return this.errorHandler('NOT_FOUND')

      const newData = await this.mainRepo.upsert(data, id)
      return { statusCode: 'OK', data: newData }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }

  async partialUpdate(id: number | string, data: Partial<any>): Promise<ReturnProps> {
    try {
      if (this.mainRepo.isValidIdKey(id) == false) return this.errorHandler('BAD_REQUEST', ['Identificador incorreto'])

      const exists = await this.mainRepo.findOne({ _id: id })
      if (!exists) return this.errorHandler('NOT_FOUND')

      await this.mainRepo.upsert(data, id)
      return { statusCode: 'NO_CONTENT', data: null }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }

  async remove(_id: string): Promise<ReturnProps> {
    try {
      if (this.mainRepo.isValidIdKey(_id) == false) return this.errorHandler('BAD_REQUEST', ['Identificador incorreto'])

      const exists = await this.mainRepo.findOne({ _id })
      if (!exists) return this.errorHandler('NOT_FOUND')

      await this.mainRepo.remove({ _id })
      return { statusCode: 'OK', data: { _id } }
    } catch (e) {
      return this.errorHandler('INTERNAL_SERVER_ERROR', e)
    }
  }
}
