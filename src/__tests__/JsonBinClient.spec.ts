import 'dotenv/config'
import { RestClient } from 'typed-rest-client/RestClient'
import JsonBinClient from '../JsonBinClient'

type Response<T> = {
  metadata: {
    id: string,
    parentId: string
  },
  record: T
}

async function getBin<T>(url: string): Promise<Response<T>> {
  const restClient: RestClient = new RestClient(null, url)
  const { result } = await restClient.get<Response<T>>(
    url, { additionalHeaders: { 'X-Master-Key': process.env.API_KEY } })
  return result as Response<T>
}

describe('Test JSONbin client', () => {
  const binToDelete: string[] = []
  const jsonBinClient = new JsonBinClient(process.env.API_KEY || '')

  it('CRUD works as expected', async () => {
    const expected = {
      'test': 1,
      'value': [3.2, 32.1, 0.01]
    }
    const resp1 = await jsonBinClient.create<typeof expected>(expected)
    binToDelete.push(resp1.id)
    const { record: actual1 } = await getBin<typeof expected>(resp1.url)
    expect(expected).toMatchObject(actual1)

    expected['test'] += 2
    expected['value'].push(5.05)
    const resp2 = await jsonBinClient.update<typeof expected>(resp1.id, expected)
    const { record: actual2 } = await getBin<typeof expected>(resp2.url)
    expect(expected).toMatchObject(actual2)
  })

  afterAll(async () => {
    await Promise.all(
      binToDelete.map((id) => jsonBinClient.delete(id))
    )
  })
})
