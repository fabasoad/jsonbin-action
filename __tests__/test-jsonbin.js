require('dotenv').config();
const got = require('got');
const { expect } = require('chai');

const jsonbin = require('../src/jsonbin');

const getBin = (url) => got
  .get(url, { headers: { 'secret-key': process.env.API_KEY } })
  .then(({ body }) => JSON.parse(body))

describe('Test JSONbin client', () => {
  const binToDelete = [];

  it('CRUD works as expected', async () => {
    const expected = {
      'test': 1,
      'value': [3.2, 32.1, 0.01]
    };
    const resp1 = await jsonbin.create(
      process.env.API_KEY, JSON.stringify(expected)
    );
    binToDelete.push(resp1.id);
    const actual1 = await getBin(resp1.url);
    expect(expected).to.deep.equal(actual1);

    expected['test'] += 2;
    expected['value'].push(5.05);
    const resp2 = await jsonbin.update(
      process.env.API_KEY, resp1.id, JSON.stringify(expected)
    );
    const actual2 = await getBin(resp2.url);
    expect(expected).to.deep.equal(actual2);
  });

  after(async () => {
    await Promise.all(
      binToDelete.map((id) => jsonbin.delete(process.env.API_KEY, id))
    );
  });
});
