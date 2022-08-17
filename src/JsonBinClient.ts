import { RestClient } from 'typed-rest-client/RestClient'

export interface JsonBinResponse {
  url: string,
  id: string
}

export class JsonBinEmptyResponseError extends Error {}

type Response<T> = {
  record: T,
  metadata: {
    id: string,
    createdAt: string,
    private: boolean,
    parentId?: string
  }
}

export default class JsonBinClient {
  private readonly URL: string = 'https://api.jsonbin.io/v3/b/'

  private readonly client: RestClient
  private readonly apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = new RestClient(null, this.URL)
  }

  public async create<T>(body: T): Promise<JsonBinResponse> {
    const { result } = await this.client.create<Response<T>>(this.URL, JSON.stringify(body), {
      additionalHeaders: {
        'X-Master-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    })
    if (result == null) {
      throw new JsonBinEmptyResponseError()
    }
    const binId: string = result.metadata.id
    return { id: binId, url: this.URL + binId }
  }

  public async update<T>(binId: string, body: T): Promise<JsonBinResponse> {
    const { result } = await this.client.update<Response<T>>(this.URL, body, {
      additionalHeaders: {
        'X-Master-Key': this.apiKey,
        'Content-Type': 'application/json',
        'X-Bin-Versioning': false
      }
    })
    if (result == null) {
      throw new JsonBinEmptyResponseError()
    }
    const parentBinId: string = result.metadata.parentId || 'unknown'
    return { id: parentBinId, url: this.URL + parentBinId }
  }

  public async delete(binId: string): Promise<JsonBinResponse> {
    const { result } = await this.client.del<Response<any>>(this.URL + binId, {
      additionalHeaders: {
        'X-Master-Key': this.apiKey
      }
    })
    if (result == null) {
      throw new JsonBinEmptyResponseError()
    }
    const respBinId: string = result.metadata.id
    return { id: respBinId, url: this.URL + respBinId }
  }
}
