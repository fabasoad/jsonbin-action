require('dotenv').config();
const got = require('got');
const { expect } = require('chai');

const jsonbin = require('../src/jsonbin');

const getBin = async (url) => {
  const { body } = await got.get(
    url, { headers: { 'X-Master-Key': process.env.API_KEY } });
  return JSON.parse(body);
}

describe('Test JSONbin client', () => {
  const binToDelete = [];

  it('CRUD works as expected', async (done) => {
    const expected = {
      'test': 1,
      'value': [3.2, 32.1, 0.01]
    };
    const resp1 = await jsonbin.create(
      process.env.API_KEY, JSON.stringify(expected)
    );
    binToDelete.push(resp1.id);
    const { record: actual1 } = await getBin(resp1.url);
    expect(expected).to.deep.equal(actual1);

    expected['test'] += 2;
    expected['value'].push(5.05);
    const resp2 = await jsonbin.update(
      process.env.API_KEY, resp1.id, JSON.stringify(expected)
    );
    const { record: actual2 } = await getBin(resp2.url);
    expect(expected).to.deep.equal(actual2);
    done();
  });

  after(async (done) => {
    await Promise.all(
      binToDelete.map((id) => jsonbin.delete(process.env.API_KEY, id))
    );
    done();
  });
});
