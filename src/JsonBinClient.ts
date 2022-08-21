import { RestClient } from 'typed-rest-client/RestClient'

export class JsonBinResponseError extends Error {
  constructor(statusCode: number, message: string) {
    super(`[${statusCode}] ${message}`)
  }
}

export class JsonBinEmptyResponseError extends JsonBinResponseError {
  constructor(statusCode: number) {
    super(statusCode, 'Response is empty')
  }
}

type CommonResponse<T> = {
  message?: string,
  record: T,
  metadata: {
    id: string,
    createdAt: string,
    private: boolean
  }
}

type GetResponse<T> = CommonResponse<T>
type CreateResponse<T> = CommonResponse<T>

type ReplaceResponse<T> = {
  message?: string,
  record: T,
  metadata: {
    private: boolean,
    parentId: string
  }
}

type DeleteResponse = {
  message: string,
  metadata: {
    id: string,
    versionDeleted: number
  }
}

export interface JsonBinResponse {
  url: string,
  id: string
}

export default class JsonBinClient {
  private readonly URL: string = 'https://api.jsonbin.io/v3/b/'
  private readonly client: RestClient

  constructor(apiKey: string) {
    this.client = new RestClient(this.constructor.name, this.URL, [], {
      headers: {
        'X-Master-Key': apiKey
      }
    })
  }

  public async get<T>(binId: string): Promise<T> {
    // const resp = await this.client.get<GetResponse<T>>(binId)
    // if (resp.result == null) {
    //   throw new JsonBinEmptyResponseError(resp.statusCode)
    // } else if (resp.result?.message != null) {
    //   throw new JsonBinResponseError(resp.statusCode, resp.result.message)
    // }
    // return resp.result.record as T
    return new Promise(() => null)
  }

  public async create<T>(body: T): Promise<JsonBinResponse> {
    const resp = await this.client.create<CreateResponse<T>>('', body)
    if (resp.result == null) {
      throw new JsonBinEmptyResponseError(resp.statusCode)
    }
    if (resp.result.message != null) {
      throw new JsonBinResponseError(resp.statusCode, resp.result.message)
    }
    const binId: string = resp.result.metadata.id || 'unknown'
    return { id: binId, url: this.URL + binId }
  }

  public async update<T>(binId: string, body: T): Promise<JsonBinResponse> {
    // const resp = await this.client.replace<ReplaceResponse<T>>(binId, body, {
    //   additionalHeaders: {
    //     'X-Bin-Versioning': false
    //   }
    // })
    // if (resp.result == null) {
    //   throw new JsonBinEmptyResponseError(resp.statusCode)
    // } else if (resp.result?.message != null) {
    //   throw new JsonBinResponseError(resp.statusCode, resp.result.message)
    // }
    // const parentBinId: string = resp.result.metadata.parentId || 'unknown'
    // return { id: parentBinId, url: this.URL + parentBinId }
    return { id: '', url: this.URL + binId }
  }

  public async delete(binId: string): Promise<JsonBinResponse> {
    // const resp = await this.client.del<DeleteResponse>(binId)
    // if (resp.result == null) {
    //   throw new JsonBinEmptyResponseError(resp.statusCode)
    // }
    // const respBinId: string = resp.result.metadata.id || 'unknown'
    // return { id: respBinId, url: this.URL + respBinId }
    return { id: '', url: this.URL + binId }
  }
}
