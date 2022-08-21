import 'dotenv/config'
import JsonBinClient from '../JsonBinClient'

describe('Test JSONbin client', () => {
  const binToDelete: string[] = []
  const client = new JsonBinClient(process.env.API_KEY || '')

  test('CRUD works as expected', async () => {
    const expected = {
      'test': 1,
      'value': [3.2, 32.1, 0.01]
    }
    const resp1 = await client.create<typeof expected>(expected)
    binToDelete.push(resp1.id)
    let actual = await client.get<typeof expected>(resp1.id)
    expect(expected).toMatchObject(actual)

    expected['test'] += 2
    expected['value'].push(5.05)
    const resp2 = await client.update<typeof expected>(resp1.id, expected)
    actual = await client.get<typeof expected>(resp2.id)
    expect(expected).toMatchObject(actual)
  })

  afterAll(async () => {
    await Promise.all(
      binToDelete.map((id: string) => client.delete(id))
    )
  })
})
